import express, { type Request, type Response } from "express";
import gameActions from "./modules/games/gamesActions";
import itemActions from "./modules/item/itemActions";
import prizeActions from "./modules/prize/prizeActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

// Define Your API Routes Here

router.use((req, res, next) => {
  next();
});

router.post("/api/user", async (req: Request, res: Response) => {
  try {
    await userActions.add(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/api/user/:username", async (req: Request, res: Response) => {
  try {
    await userActions.read(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define item-related routes

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/prizes", prizeActions.browse);
router.get("/api/prizes/:id", prizeActions.read);

router.get("/api/games", gameActions.browse);
router.get("/api/games/:id", gameActions.read);

export default router;
