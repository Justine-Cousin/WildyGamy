import type { Request, RequestHandler, Response } from "express";
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
    const prizes: CreatePrize = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      exchange_price: req.body.exchange_price,
      is_available: req.body.is_available,
    };
    const insertId = await prizeRepository.create(prizes);
    res.status(201).json({ id: insertId });
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
