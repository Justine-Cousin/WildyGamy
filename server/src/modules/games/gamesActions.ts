import { log } from "node:console";
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

export default { browse, read, updateAvailability };
