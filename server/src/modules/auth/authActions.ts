import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import userRepository from "../../modules/user/userRepository";

const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await userRepository.readByEmailWithPassword(req.body.email);

    if (user == null) {
      res.sendStatus(422);
      return;
    }

    const verified = await argon2.verify(user.password_hash, req.body.password);

    if (verified) {
      const { password_hash, ...userWithoutPassword } = user;

      const token = jwt.sign(
        {
          sub: user.id.toString(),
          username: user.username,
        },
        process.env.APP_SECRET as string,
        { expiresIn: "1h" },
      );

      res.json({
        token,
        user: userWithoutPassword,
      });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.password_hash = hashedPassword;
    req.body.password = undefined;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (authHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

export default { login, hashPassword, verifyToken };
