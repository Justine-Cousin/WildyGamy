import type { RequestHandler } from "express";
import favoritesRepository from "./favoritesRepository";

const getUserFavorites: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const favorites = await favoritesRepository.getUserFavorites(userId);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

export default { getUserFavorites };
