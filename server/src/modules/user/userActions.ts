import argon2 from "argon2";
import type { RequestHandler } from "express";
import type { UploadedFile } from "express-fileupload";
import cloudinary from "../../middleware/cloudinary";
import userRepository from "./userRepository";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    const usersWithoutPassword = users.map(
      ({ password_hash, ...user }) => user,
    );

    res.json(usersWithoutPassword);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const user = await userRepository.readById(Number(id));

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const { password_hash, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { name, firstname, email, username, password, phone_number } =
      req.body;

    if (
      !name?.trim() ||
      !firstname?.trim() ||
      !email?.trim() ||
      !username?.trim() ||
      !password
    ) {
      res.status(400).json({ error: "Tous les champs sont requis" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Le format d'email n'est pas valide" });
      return;
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ error: "Le mot de passe doit contenir au moins 6 caractères" });
      return;
    }

    const existingEmail = await userRepository.readByEmail(email);
    if (existingEmail) {
      res.status(400).json({ error: "Cet adresse email est déjà utilisé" });
      return;
    }

    const existingUsername = await userRepository.readByUsername(username);
    if (existingUsername) {
      res.status(400).json({ error: "Ce pseudo n'est pas disponible" });
      return;
    }
    const hashedPassword = await argon2.hash(password, hashingOptions);

    let profilePicUrl = null;
    if (req.files && "profile_pic" in req.files) {
      const profilePic = req.files.profile_pic as UploadedFile;

      if (
        !["image/jpeg", "image/jpg", "image/png"].includes(profilePic.mimetype)
      ) {
        res.status(400).json({
          error:
            "Seuls les fichiers aux formats JPG, JPEG et PNG sont acceptés",
        });
        return;
      }

      try {
        const result = await cloudinary.uploader.upload(
          profilePic.tempFilePath,
          {
            folder: "profile_pics",
            resource_type: "auto",
          },
        );
        profilePicUrl = result.secure_url;
      } catch (uploadError) {
        console.error("Erreur upload Cloudinary:", uploadError);
        res.status(500).json({ error: "Erreur lors de l'upload de l'image" });
        return;
      }
    }

    const userId = await userRepository.create({
      name: name.trim(),
      firstname: firstname.trim(),
      email: email.trim().toLowerCase(),
      username: username.trim(),
      password_hash: hashedPassword,
      phone_number: phone_number?.trim(),
      highscore: 0,
      profile_pic: profilePicUrl,
      is_banned: false,
      is_admin: false,
    });

    res.status(201).json({
      message: "Bienvenue ! Votre compte a été créé avec succès",
      userId,
    });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Add profile_pic to allowed updates
    const allowedUpdates = [
      "name",
      "firstname",
      "email",
      "username",
      "phone_number",
      "profile_pic",
    ];

    // Handle file upload if present
    if (req.files && "profile_pic" in req.files) {
      const profilePic = req.files.profile_pic as UploadedFile;
      const result = await cloudinary.uploader.upload(profilePic.tempFilePath, {
        folder: "profile_pics",
      });
      updates.profile_pic = result.secure_url;
    }

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([key]) => allowedUpdates.includes(key)),
    );

    const success = await userRepository.update(Number(id), filteredUpdates);

    if (!success) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const updatedUser = await userRepository.readById(Number(id));
    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    const { password_hash, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};

const updateHighscore: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { highscore } = req.body;

    const user = await userRepository.readById(Number(id));
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (highscore > (user.highscore || 0)) {
      const success = await userRepository.updateHighscore(
        Number(id),
        highscore,
      );
      if (!success) {
        res.status(404).json({ error: "Update failed" });
        return;
      }
      res.status(200).json({ message: "Highscore updated successfully" });
    } else {
      res.status(200).json({ message: "Score not high enough to update" });
    }
  } catch (err) {
    next(err);
  }
};

const updatePoints: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { points } = req.body;

    const user = await userRepository.readById(Number(id));
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const newTotalPoints = user.total_points + points;
    const newCurrentPoints = user.current_points + points;

    const success = await userRepository.updatePoints(
      Number(id),
      newTotalPoints,
      newCurrentPoints,
    );
    if (!success) {
      res.status(404).json({ error: "Update failed" });
      return;
    }

    res.status(200).json({ message: "Points updated successfully" });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const success = await userRepository.delete(Number(id));

    if (!success) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const toggleBan: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const { is_banned } = req.body;
    const affectedRows = await userRepository.toggleBan(userId, is_banned);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const toggleAdmin: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const { is_admin } = req.body;
    const affectedRows = await userRepository.toggleAdmin(userId, is_admin);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  read,
  add,
  edit,
  destroy,
  toggleBan,
  toggleAdmin,
  updateHighscore,
  updatePoints,
};
