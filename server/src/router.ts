import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import {
  requestPasswordReset,
  resetPassword,
  verifyResetToken,
} from "../src/modules/password/PasswordResetHandler";
import acquiredActions from "./modules/acquired/acquiredActions";
import authActions from "./modules/auth/authActions";
import { sendContact } from "./modules/email/emailActions";
import favoritesActions from "./modules/favorites/favoritesActions";
import gameActions from "./modules/games/gamesActions";
import prizeActions from "./modules/prize/prizeActions";
import userActions from "./modules/user/userActions";
import usersActions from "./modules/users/usersActions";

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

const handleAsyncError = (
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

router.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Routes publiques qui ne nécessitent pas d'authentification
router.post("/api/login", authActions.login);
router.post("/api/reset-password/request", requestPasswordReset);
router.get("/api/reset-password/verify", verifyResetToken);
router.post("/api/reset-password/reset", resetPassword);
router.post("/api/contact", sendContact);

// Routes publiques pour les jeux et prix disponibles
router.get("/api/games/available", gameActions.browseAvailable);
router.get("/api/games/new", gameActions.browseNew);
router.get("/api/games", gameActions.browse);
router.get("/api/games/:id", gameActions.read);
router.get("/api/prizes/available", prizeActions.browseAvailable);
router.get("/api/prizes", prizeActions.browse);
router.get("/api/prizes/:id", prizeActions.read);
router.get("/api/user", userActions.browse);

// Middleware de vérification du token pour toutes les routes suivantes
router.use("/api/*", authActions.verifyToken);
// Routes protégées (nécessitant authentification)
// Routes utilisateur

router.post("/api/user", userActions.add);
router.get("/api/user/:id", userActions.read);
router.put("/api/user/:id", userActions.edit);
router.put("/api/user/:username", userActions.edit);
router.put("/api/user/:id/password", userActions.updatePassword);
router.put("/api/user/:id/highscore", userActions.updateHighscore);
router.put("/api/user/:id/points", userActions.updatePoints);

// Routes favoris et acquisitions
router.get("/api/user/:id/favorites", favoritesActions.read);
router.post("/api/user/:id/favorites", favoritesActions.add);
router.delete("/api/user/:id/favorites", favoritesActions.destroy);
router.get("/api/user/:id/acquired", acquiredActions.read);
router.post("/api/user/:id/acquired", acquiredActions.add);

// Routes admin
router.put("/api/user/:id/ban", usersActions.toggleBan);
router.put("/api/user/:id/admin", usersActions.toggleAdmin);
router.delete("/api/user/:id", userActions.destroy);
router.delete("/api/user/:username", userActions.destroy);
router.get("/api/users", usersActions.browse);
router.get("/api/users/:id", usersActions.read);
router.post("/api/users", usersActions.add);
router.put("/api/users/:id", usersActions.edit);
router.delete("/api/users/:id", usersActions.destroy);
router.post("/api/games", gameActions.add);
router.patch("/api/games/:id/availability", gameActions.updateAvailability);
router.put("/api/games/:id/new", gameActions.toggleNew);
router.put("/api/games/:id", gameActions.edit);
router.delete("/api/games/:id", gameActions.destroy);
router.post("/api/prizes", prizeActions.add);
router.patch("/api/prizes/:id/availability", prizeActions.updateAvailability);
router.put("/api/prizes/:id", prizeActions.edit);
router.delete("/api/prizes/:id", prizeActions.destroy);

export default router;
