import type { Request, RequestHandler, Response } from "express";
import type { UploadedFile } from "express-fileupload";
import cloudinary from "../../middleware/cloudinary";
import type { CreatePrize } from "./prizeRepository";
import prizeRepository from "./prizeRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const prizes = await prizeRepository.readAll();

    res.json(prizes);
  } catch (err) {
    next(err);
  }
};

const browseAvailable: RequestHandler = async (req, res, next) => {
  try {
    const prizes = await prizeRepository.readAllAvailable();

    res.json(prizes);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const prizesId = Number(req.params.id);
    const prizes = await prizeRepository.read(prizesId);

    if (prizes == null) {
      res.sendStatus(404);
    } else {
      res.json(prizes);
    }
  } catch (err) {
    next(err);
  }
};

const updateAvailability: RequestHandler = async (req, res, next) => {
  try {
    const prizesId = Number(req.params.id);
    const isAvailable = req.body.isAvailable;

    await prizeRepository.updateAvailability(prizesId, isAvailable);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const prizes = {
      id: Number(req.params.id),
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      exchange_price: req.body.exchange_price,
      is_available: req.body.is_available,
    };
    const affectedRows = await prizeRepository.update(prizes);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const prizeId = Number(req.params.id);
    await prizeRepository.delete(prizeId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const { name, description, exchange_price } = req.body;

    if (!name?.trim() || !description?.trim() || !exchange_price?.trim()) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    let imageUrl = null;
    if (req.files && "image" in req.files) {
      const image = req.files.image as UploadedFile;

      if (!["image/jpeg", "image/png", "image/gif"].includes(image.mimetype)) {
        res.status(400).json({ error: "Invalid image format" });
        return;
      }
      try {
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: "prizes",
          resource_type: "auto",
        });
        imageUrl = result.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        res.status(500).json({ error: "Error uploading image" });
        return;
      }
    }
    const prizeId = await prizeRepository.create({
      name: name.trim(),
      description: description.trim(),
      image: imageUrl,
      exchange_price: exchange_price.trim(),
      is_available: true,
    });

    res.status(201).json({ message: "Prize created successfully", prizeId });
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  browseAvailable,
  read,
  updateAvailability,
  edit,
  destroy,
  add,
};
