import argon2 from "argon2";

import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import userRepository from "../user/userRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      res.status(400).json({ error: "Email et mot de passe requis" });
      return;
    }

    const user = await userRepository.readByEmailWithPassword(
      email.trim().toLowerCase(),
    );

    if (!user) {
      res.status(422).json({ error: "Identifiants invalides" });
      return;
    }

    const verified = await argon2.verify(user.password_hash, password);

    if (!verified) {
      res.status(422).json({ error: "Identifiants invalides" });
      return;
    }

    const { password_hash, ...userWithoutPassword } = user;

    const token = jwt.sign(
      {
        sub: user.id.toString(),
        email: user.email,
        username: user.username,
      },
      process.env.APP_SECRET as string,
      {
        expiresIn: "1h",
      },
    );

    res.json({
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      throw new Error("Authorization header manquant");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Type d'autorisation invalide");
    }

    const decoded = jwt.verify(
      token,
      process.env.APP_SECRET as string,
    ) as MyPayload;

    req.auth = decoded;

    next();
  } catch (err) {
    console.error("Erreur d'authentification:", err);
    res.status(401).json({ error: "Non autorisé" });
  }
};

export default { login, verifyToken };
