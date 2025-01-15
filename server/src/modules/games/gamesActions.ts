import type { Request, RequestHandler, Response } from "express";
import gamesRepository from "./gamesRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const games = await gamesRepository.readAll();

    res.json(games);
  } catch (err) {
    next(err);
  }
};

const browseAvailable: RequestHandler = async (req, res, next) => {
  try {
    const games = await gamesRepository.readAllAvailable();

    res.json(games);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const gamesId = Number(req.params.id);
    const games = await gamesRepository.read(gamesId);

    if (games == null) {
      res.sendStatus(404);
    } else {
      res.json(games);
    }
  } catch (err) {
    next(err);
  }
};

const updateAvailability: RequestHandler = async (req, res, next) => {
  try {
    const gamesId = Number(req.params.id);
    const isAvailable = req.body.isAvailable;

    await gamesRepository.updateAvailability(gamesId, isAvailable);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const games = {
      id: Number(req.params.id),
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      is_available: req.body.is_available,
    };
    const affectedRows = await gamesRepository.update(games);
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
    const gamesId = Number(req.params.id);
    await gamesRepository.delete(gamesId);
    res.sendStatus(204);
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
};
