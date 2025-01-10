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
import userActions from "./modules/users/userActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/prizes", prizeActions.browse);
router.get("/api/prizes/:id", prizeActions.read);

router.get("/api/games", gameActions.browse);
router.get("/api/games/:id", gameActions.read);

router.get("/api/users", userActions.browse);
router.post("/api/users", userActions.create);

export default router;
