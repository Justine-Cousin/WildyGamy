import express from "express";
const router = express.Router();
// Define Your API Routes Here

router.use((req, res, next) => {
  next();
});
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import prizeActions from "./modules/prize/prizeActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/prizes", prizeActions.browse);
router.get("/api/prizes/:id", prizeActions.read);

export default router;
