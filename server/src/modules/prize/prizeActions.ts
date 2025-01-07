import type { Request, Response } from "express";
import prizeRepository from "./prizeRepository";

const prizeActions = {
  browse: async (req: Request, res: Response) => {
    try {
      const [results] = await prizeRepository.getAllPrizes();
      res.json(results);
    } catch (error) {
      console.error("Erreur dans browse:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des prix" });
    }
  },

  read: async (req: Request, res: Response) => {
    try {
      const [results] = await prizeRepository.getPrizeById(
        Number(req.params.id),
      );

      if (!Array.isArray(results) || results.length === 0) {
        res.status(404).json({ message: "Prix non trouvé" });
      } else {
        res.json(results[0]);
      }
    } catch (error) {
      console.error("Erreur dans read:", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération du prix" });
    }
  },
};

export default prizeActions;
