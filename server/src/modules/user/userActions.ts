import path from "node:path";
import type { Request, Response } from "express";
import type { UploadedFile } from "express-fileupload";
import UserRepository from "./userRepository";

const userActions = {
  browse: async (req: Request, res: Response) => {
    try {
      res.setHeader("Content-Type", "application/json");

      res.status(501).json({
        error: "La liste des utilisateurs n'est pas disponible",
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      res.status(500).json({
        error: "Erreur lors de la récupération des utilisateurs",
      });
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      const user = await UserRepository.readById(Number(id));

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password_hash, ...userWithoutPassword } = user;
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Error reading user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  add: async (req: Request, res: Response) => {
    try {
      res.setHeader("Content-Type", "application/json");

      console.error("Request body:", req.body);
      console.error("Request files:", req.files);

      const { name, firstname, email, username, password, phone_number } =
        req.body;

      if (
        !name?.trim() ||
        !firstname?.trim() ||
        !email?.trim() ||
        !username?.trim() ||
        !password
      ) {
        return res.status(400).json({
          error: "Veuillez remplir tous les champs obligatoires",
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: "Format d'email invalide",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          error: "Le mot de passe doit contenir au moins 6 caractères",
        });
      }

      const existingEmail = await UserRepository.readByEmail(email);
      if (existingEmail) {
        return res.status(400).json({
          error: "Cette adresse email est déjà utilisée",
        });
      }

      const existingUsername = await UserRepository.readByUsername(username);
      if (existingUsername) {
        return res.status(400).json({
          error: "Ce nom d'utilisateur est déjà utilisé",
        });
      }

      let profile_pic_path = null;
      if (req.files && "profile_pic" in req.files) {
        const profilePic = req.files.profile_pic as UploadedFile;

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(profilePic.mimetype)) {
          return res.status(400).json({
            error: "Seuls les formats JPG, JPEG et PNG sont acceptés",
          });
        }

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const extension = path.extname(profilePic.name);
        const filename = `profile-${uniqueSuffix}${extension}`;

        try {
          await profilePic.mv(
            path.join(
              __dirname,
              "../../../public/uploads/profile_pics",
              filename,
            ),
          );
          profile_pic_path = `/uploads/profile_pics/${filename}`;
        } catch (moveError) {
          console.error("Erreur lors du déplacement du fichier:", moveError);
          return res.status(500).json({
            error: "Erreur lors de l'enregistrement de l'image de profil",
          });
        }
      }

      const userId = await UserRepository.create({
        name: name.trim(),
        firstname: firstname.trim(),
        email: email.trim(),
        username: username.trim(),
        password,
        phone_number: phone_number?.trim(),
        profile_pic: profile_pic_path,
      });

      res.status(201).json({
        message: "Compte créé avec succès",
        userId,
      });
    } catch (error) {
      console.error("Erreur lors de la création du compte:", error);
      res.status(500).json({
        error: "Une erreur est survenue lors de la création du compte",
      });
    }
  },

  edit: async (req: Request, res: Response) => {
    try {
      res.setHeader("Content-Type", "application/json");
      res.status(501).json({
        error: "La modification de compte n'est pas encore disponible",
      });
    } catch (error) {
      console.error("Erreur lors de la modification du compte:", error);
      res.status(500).json({
        error: "Une erreur est survenue lors de la modification du compte",
      });
    }
  },

  destroy: async (req: Request, res: Response) => {
    try {
      res.setHeader("Content-Type", "application/json");
      res.status(501).json({
        error: "La suppression de compte n'est pas encore disponible",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du compte:", error);
      res.status(500).json({
        error: "Une erreur est survenue lors de la suppression du compte",
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      res.setHeader("Content-Type", "application/json");
      res.status(501).json({
        error: "La connexion n'est pas encore disponible",
      });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({
        error: "Une erreur est survenue lors de la connexion",
      });
    }
  },
};

export default userActions;
