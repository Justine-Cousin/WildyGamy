import type { Request, Response } from "express";
import gamesRepository from "./gamesRepository";

const gamesActions = {
  browse: async (req: Request, res: Response) => {
    try {
      const [results] = await gamesRepository.getAllGames();
      res.json(results);
    } catch (error) {
      console.error("Erreur dans browse:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des jeux" });
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const [results] = await gamesRepository.getGamesID(Number(req.params.id));

      if (!Array.isArray(results) || results.length === 0) {
        res.status(404).json({ message: "Jeu non trouvé" });
      } else {
        res.json(results[0]);
      }
    } catch (error) {
      console.error("Erreur dans read:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du jeu" });
    }
  },
};

export default gamesActions;
