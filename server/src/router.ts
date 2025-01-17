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

router.get("/api/prizes/available", prizeActions.browseAvailable);
router.get("/api/prizes", prizeActions.browse);
router.get("/api/prizes/:id", prizeActions.read);
router.post("/api/prizes", prizeActions.add);
router.patch("/api/prizes/:id/availability", prizeActions.updateAvailability);
router.put("/api/prizes/:id", prizeActions.edit);
router.delete("/api/prizes/:id", prizeActions.destroy);

router.get("/api/games/available", gameActions.browseAvailable);
router.get("/api/games", gameActions.browse);
router.get("/api/games/:id", gameActions.read);
router.post("/api/games", gameActions.add);
router.patch("/api/games/:id/availability", gameActions.updateAvailability);
router.put("/api/games/:id", gameActions.edit);
router.delete("/api/games/:id", gameActions.destroy);

export default router;
