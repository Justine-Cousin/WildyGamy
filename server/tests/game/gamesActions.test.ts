import type { NextFunction, Request, Response } from "express";
import type { UploadedFile } from "express-fileupload";
import cloudinary from "../../src/middleware/cloudinary";
import gameActions from "../../src/modules/games/gamesActions";
import gamesRepository from "../../src/modules/games/gamesRepository";

// Mock des dépendances
jest.mock("../../src/modules/games/gamesRepository");
jest.mock("../../src/middleware/cloudinary", () => ({
  uploader: {
    upload: jest.fn(),
  },
}));

describe("gameActions", () => {
  // Variables pour les mocks de Request, Response et NextFunction
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    // Initialisation des mocks avant chaque test
    req = {
      params: {},
      body: {},
      files: {},
    };

    res = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
    };

    next = jest.fn();

    // Réinitialiser les mocks des repositories
    jest.clearAllMocks();
  });

  describe("browse", () => {
    it("should return all games", async () => {
      // Données de test
      const mockGames = [
        { id: 1, name: "Game 1", description: "Description 1", price: 10 },
        { id: 2, name: "Game 2", description: "Description 2", price: 20 },
      ];

      // Configuration du mock du repository
      (gamesRepository.readAll as jest.Mock).mockResolvedValue(mockGames);

      // Appel de la méthode à tester
      await gameActions.browse(req as Request, res as Response, next);

      // Vérifications
      expect(gamesRepository.readAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockGames);
    });

    it("should handle errors", async () => {
      // Simuler une erreur
      const error = new Error("Database error");
      (gamesRepository.readAll as jest.Mock).mockRejectedValue(error);

      // Appel de la méthode à tester
      await gameActions.browse(req as Request, res as Response, next);

      // Vérification que l'erreur est transmise au middleware suivant
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("browseAvailable", () => {
    it("should return only available games", async () => {
      // Données de test
      const mockAvailableGames = [
        { id: 1, name: "Game 1", is_available: true },
      ];

      // Configuration du mock du repository
      (gamesRepository.readAllAvailable as jest.Mock).mockResolvedValue(
        mockAvailableGames,
      );

      // Appel de la méthode à tester
      await gameActions.browseAvailable(req as Request, res as Response, next);

      // Vérifications
      expect(gamesRepository.readAllAvailable).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockAvailableGames);
    });
  });

  describe("browseNew", () => {
    it("should return new games", async () => {
      // Données de test
      const mockNewGames = [
        { id: 1, name: "New Game", is_new: true, is_available: true },
      ];

      // Configuration du mock du repository
      (gamesRepository.readAllNew as jest.Mock).mockResolvedValue(mockNewGames);

      // Appel de la méthode à tester
      await gameActions.browseNew(req as Request, res as Response, next);

      // Vérifications
      expect(gamesRepository.readAllNew).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockNewGames);
    });
  });

  describe("read", () => {
    it("should return a specific game when found", async () => {
      // Configuration de la requête
      req.params = { id: "5" };

      // Données de test
      const mockGame = { id: 5, name: "Game 5", description: "Description 5" };

      // Configuration du mock du repository
      (gamesRepository.read as jest.Mock).mockResolvedValue(mockGame);

      // Appel de la méthode à tester
      await gameActions.read(req as Request, res as Response, next);

      // Vérifications
      expect(gamesRepository.read).toHaveBeenCalledWith(5);
      expect(res.json).toHaveBeenCalledWith(mockGame);
    });

    it("should return 404 when game is not found", async () => {
      // Configuration de la requête
      req.params = { id: "999" };

      // Configuration du mock du repository pour retourner null
      (gamesRepository.read as jest.Mock).mockResolvedValue(null);

      // Appel de la méthode à tester
      await gameActions.read(req as Request, res as Response, next);

      // Vérifications
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("add", () => {
    it("should create a new game", async () => {
      // Configuration de la requête
      req.body = {
        name: "New Game",
        description: "New Description",
        price: "25.99",
        is_available: true,
      };

      // Mock pour l'ID généré et le jeu créé
      const newGameId = 10;
      const createdGame = { id: 10, ...req.body, price: 25.99 };

      // Configuration des mocks
      (gamesRepository.create as jest.Mock).mockResolvedValue(newGameId);
      (gamesRepository.read as jest.Mock).mockResolvedValue(createdGame);

      // Appel de la méthode à tester
      await gameActions.add(req as Request, res as Response, next);

      // Vérifications
      expect(gamesRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "New Game",
          description: "New Description",
          price: 25.99,
          is_available: true,
        }),
      );
      expect(gamesRepository.read).toHaveBeenCalledWith(newGameId);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdGame);
    });

    it("should handle image upload", async () => {
      // Mock du fichier uploadé
      const mockFile = {
        tempFilePath: "/tmp/test-image.jpg",
      } as UploadedFile;

      req.files = { image: mockFile };
      req.body = {
        name: "Game with Image",
        description: "Description",
        price: "30",
      };

      // Mock de Cloudinary
      const cloudinaryResult = {
        secure_url: "https://cloudinary.com/image.jpg",
      };
      (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(
        cloudinaryResult,
      );

      // Mocks des méthodes du repository
      const newGameId = 11;
      const createdGame = {
        id: 11,
        name: "Game with Image",
        image: "https://cloudinary.com/image.jpg",
      };
      (gamesRepository.create as jest.Mock).mockResolvedValue(newGameId);
      (gamesRepository.read as jest.Mock).mockResolvedValue(createdGame);

      // Appel de la méthode à tester
      await gameActions.add(req as Request, res as Response, next);

      // Vérifications
      expect(cloudinary.uploader.upload).toHaveBeenCalledWith(
        mockFile.tempFilePath,
        expect.objectContaining({ folder: "games" }),
      );
      expect(gamesRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          image: "https://cloudinary.com/image.jpg",
        }),
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdGame);
    });
  });

  describe("updateAvailability", () => {
    it("should update game availability", async () => {
      // Configuration de la requête
      req.params = { id: "7" };
      req.body = { isAvailable: true };

      // Mock du repository
      (gamesRepository.updateAvailability as jest.Mock).mockResolvedValue(
        undefined,
      );

      // Appel de la méthode à tester
      await gameActions.updateAvailability(
        req as Request,
        res as Response,
        next,
      );

      // Vérifications
      expect(gamesRepository.updateAvailability).toHaveBeenCalledWith(7, true);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });

  describe("toggleNew", () => {
    it("should toggle the new status of a game", async () => {
      // Configuration de la requête
      req.params = { id: "3" };
      req.body = { isNew: true };

      // Mock du repository avec succès (1 ligne affectée)
      (gamesRepository.toggleNew as jest.Mock).mockResolvedValue(1);

      // Appel de la méthode à tester
      await gameActions.toggleNew(req as Request, res as Response, next);

      // Vérifications
      expect(gamesRepository.toggleNew).toHaveBeenCalledWith(3, true);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 404 when game to toggle is not found", async () => {
      // Configuration de la requête
      req.params = { id: "999" };
      req.body = { isNew: true };

      // Mock du repository avec échec (0 ligne affectée)
      (gamesRepository.toggleNew as jest.Mock).mockResolvedValue(0);

      // Appel de la méthode à tester
      await gameActions.toggleNew(req as Request, res as Response, next);

      // Vérifications
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("edit", () => {
    it("should update a game", async () => {
      // Configuration de la requête
      req.params = { id: "8" };
      req.body = {
        name: "Updated Game",
        description: "Updated Description",
        price: "40.99",
        image: "existing-image.jpg",
      };

      // Mock du repository
      const updatedGame = { id: 8, ...req.body, price: 40.99 };
      (gamesRepository.update as jest.Mock).mockResolvedValue(1); // 1 ligne affectée
      (gamesRepository.read as jest.Mock).mockResolvedValue(updatedGame);

      // Appel de la méthode à tester
      await gameActions.edit(req as Request, res as Response, next);

      // Vérifications
      expect(gamesRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 8,
          name: "Updated Game",
        }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedGame);
    });

    it("should return 404 when game to update is not found", async () => {
      // Configuration de la requête
      req.params = { id: "999" };
      req.body = { name: "Non-existent Game" };

      // Mock du repository avec échec (0 ligne affectée)
      (gamesRepository.update as jest.Mock).mockResolvedValue(0);

      // Appel de la méthode à tester
      await gameActions.edit(req as Request, res as Response, next);

      // Vérifications
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("destroy", () => {
    it("should delete a game", async () => {
      // Configuration de la requête
      req.params = { id: "15" };

      // Mock du repository
      (gamesRepository.delete as jest.Mock).mockResolvedValue(1); // 1 ligne affectée

      // Appel de la méthode à tester
      await gameActions.destroy(req as Request, res as Response, next);

      // Vérifications
      expect(gamesRepository.delete).toHaveBeenCalledWith(15);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
