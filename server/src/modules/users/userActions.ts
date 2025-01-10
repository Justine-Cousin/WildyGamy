import { hash } from "bcrypt";
import type { Request, Response } from "express";
import userRepository from "./userRepository";

const userActions = {
  browse: async (req: Request, res: Response) => {
    try {
      const [results] = await userRepository.getAllUsers();
      res.json(results);
    } catch (error) {
      console.error("Erreur dans browse:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password, profilePicture, ...otherData } =
        req.body;

      const [existingEmail] = await userRepository.getUserByEmail(email);

      if (existingEmail === email) {
        res.status(400).json({ message: "Cet email est déjà utilisé" });
        return;
      }

      const [existingUsername] =
        await userRepository.getUserByUsername(username);
      if (existingUsername === username) {
        res
          .status(400)
          .json({ message: "Ce nom d'utilisateur est déjà utilisé" });
        return;
      }

      const newUser = {
        ...otherData,
        username,
        email,
        password_hash: password,
        profile_pic: profilePicture || null,
        total_points: 0,
        current_points: 0,
      };

      const result = await userRepository.createUser(newUser);

      res.status(201).json({
        message: "Utilisateur créé avec succès",
        user: { ...newUser, id: result.insertId },
      });
    } catch (error) {
      console.error("Erreur dans create:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la création de l'utilisateur" });
    }
  },
};

export default userActions;
