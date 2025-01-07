// app.ts
import express from "express";

const app = express();

/* ************************************************************************* */

// CORS Configuration
import cors from "cors";

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  }),
);

/* ************************************************************************* */

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ************************************************************************* */

// Import et utilisation du router
import router from "./router";
app.use(router);

/* ************************************************************************* */

// Servir les fichiers statiques
import fs from "node:fs";
import path from "node:path";

const publicFolderPath = path.join(__dirname, "../../server/public");
if (fs.existsSync(publicFolderPath)) {
  app.use(express.static(publicFolderPath));
}

const clientBuildPath = path.join(__dirname, "../../client/dist");
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get("*", (_, res) => {
    res.sendFile("index.html", { root: clientBuildPath });
  });
}

/* ************************************************************************* */

// Gestion des erreurs
import type { ErrorRequestHandler } from "express";

const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.error("on req:", req.method, req.path);
  next(err);
};

app.use(logErrors);

// Middleware 404 pour les routes API
app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ************************************************************************* */

export default app;
