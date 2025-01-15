import express from "express";
const router = express.Router();
// Define Your API Routes Here

router.use((req, res, next) => {
  next();
});
import gameActions from "./modules/games/gamesActions";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import prizeActions from "./modules/prize/prizeActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/prizes", prizeActions.browse);
router.get("/api/prizes/:id", prizeActions.read);

router.get("/api/games/available", gameActions.browseAvailable);
router.get("/api/games", gameActions.browse);
router.get("/api/games/:id", gameActions.read);
router.patch("/api/games/:id/availability", gameActions.updateAvailability);

export default router;
