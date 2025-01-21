import type { RequestHandler } from "express";
import acquiredRepository from "./acquiredRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const acquired = await acquiredRepository.read(userId);
    res.json(acquired);
  } catch (err) {
    next(err);
  }
};

export default { read };
