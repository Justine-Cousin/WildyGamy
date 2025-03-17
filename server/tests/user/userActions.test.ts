import argon2 from "argon2";
import type { NextFunction, Request, Response } from "express";
import type { UploadedFile } from "express-fileupload";
import cloudinary from "../../src/middleware/cloudinary";
import userActions from "../../src/modules/user/userActions";
import userRepository from "../../src/modules/user/userRepository";

// Mock des dépendances
jest.mock("../../src/modules/user/userRepository");
jest.mock("argon2");
jest.mock("../../src/middleware/cloudinary", () => ({
  uploader: {
    upload: jest.fn(),
  },
}));

describe("userActions", () => {
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
    it("should return all users without password_hash", async () => {
      // Données de test
      const mockUsers = [
        {
          id: 1,
          name: "User1",
          firstname: "First1",
          password_hash: "hash1",
          email: "user1@test.com",
        },
        {
          id: 2,
          name: "User2",
          firstname: "First2",
          password_hash: "hash2",
          email: "user2@test.com",
        },
      ];

      const expectedUsers = [
        { id: 1, name: "User1", firstname: "First1", email: "user1@test.com" },
        { id: 2, name: "User2", firstname: "First2", email: "user2@test.com" },
      ];

      // Configuration du mock du repository
      (userRepository.readAll as jest.Mock).mockResolvedValue(mockUsers);

      // Appel de la méthode à tester
      await userActions.browse(req as Request, res as Response, next);

      // Vérifications
      expect(userRepository.readAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(expectedUsers);
    });

    it("should handle errors", async () => {
      // Simuler une erreur
      const error = new Error("Database error");
      (userRepository.readAll as jest.Mock).mockRejectedValue(error);

      // Appel de la méthode à tester
      await userActions.browse(req as Request, res as Response, next);

      // Vérification que l'erreur est transmise au middleware suivant
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("read", () => {
    it("should return a specific user without password_hash when found", async () => {
      // Configuration de la requête
      req.params = { id: "5" };

      // Données de test
      const mockUser = {
        id: 5,
        name: "Test",
        firstname: "User",
        email: "test@example.com",
        password_hash: "hashedpassword",
      };

      const expectedUser = {
        id: 5,
        name: "Test",
        firstname: "User",
        email: "test@example.com",
      };

      // Configuration du mock du repository
      (userRepository.readById as jest.Mock).mockResolvedValue(mockUser);

      // Appel de la méthode à tester
      await userActions.read(req as Request, res as Response, next);

      // Vérifications
      expect(userRepository.readById).toHaveBeenCalledWith(5);
      expect(res.json).toHaveBeenCalledWith(expectedUser);
    });

    it("should return 404 when user is not found", async () => {
      // Configuration de la requête
      req.params = { id: "999" };

      // Configuration du mock du repository pour retourner null
      (userRepository.readById as jest.Mock).mockResolvedValue(undefined);

      // Appel de la méthode à tester
      await userActions.read(req as Request, res as Response, next);

      // Vérifications
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });

  describe("add", () => {
    it("should create a new user", async () => {
      // Configuration de la requête
      req.body = {
        name: "New",
        firstname: "User",
        email: "new.user@example.com",
        username: "newuser",
        password: "password123",
        phone_number: "1234567890",
      };

      // Mock pour l'ID généré
      const newUserId = 10;

      // Mock pour le hachage du mot de passe
      (argon2.hash as jest.Mock).mockResolvedValue("hashedpassword123");

      // Mock pour la création d'utilisateur
      (userRepository.readByEmail as jest.Mock).mockResolvedValue(undefined);
      (userRepository.readByUsername as jest.Mock).mockResolvedValue(undefined);
      (userRepository.create as jest.Mock).mockResolvedValue(newUserId);

      // Appel de la méthode à tester
      await userActions.add(req as Request, res as Response, next);

      // Vérifications
      expect(argon2.hash).toHaveBeenCalledWith(
        "password123",
        expect.any(Object),
      );
      expect(userRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "New",
          firstname: "User",
          email: "new.user@example.com",
          username: "newuser",
          password_hash: "hashedpassword123",
          phone_number: "1234567890",
        }),
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.any(String),
          userId: newUserId,
        }),
      );
    });

    it("should handle email already in use", async () => {
      // Configuration de la requête
      req.body = {
        name: "Existing",
        firstname: "Email",
        email: "existing@example.com",
        username: "newuser",
        password: "password123",
      };

      // Mock pour un email déjà existant
      (userRepository.readByEmail as jest.Mock).mockResolvedValue({
        id: 5,
        email: "existing@example.com",
      });

      // Appel de la méthode à tester
      await userActions.add(req as Request, res as Response, next);

      // Vérifications
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: expect.stringContaining("email"),
      });
    });
  });

  describe("edit", () => {
    it("should update a user", async () => {
      // Configuration de la requête
      req.params = { id: "8" };
      req.body = {
        name: "Updated",
        firstname: "User",
        email: "updated@example.com",
      };

      // Mock du repository
      (userRepository.update as jest.Mock).mockResolvedValue(true);
      (userRepository.readById as jest.Mock).mockResolvedValue({
        id: 8,
        name: "Updated",
        firstname: "User",
        email: "updated@example.com",
        password_hash: "hashedpassword",
      });

      // Appel de la méthode à tester
      await userActions.edit(req as Request, res as Response, next);

      // Vérifications
      expect(userRepository.update).toHaveBeenCalledWith(
        8,
        expect.objectContaining({
          name: "Updated",
          firstname: "User",
          email: "updated@example.com",
        }),
      );
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 8,
          name: "Updated",
          firstname: "User",
          email: "updated@example.com",
        }),
      );
    });

    it("should handle password update", async () => {
      // Configuration de la requête
      req.params = { id: "8" };
      req.body = {
        name: "Updated",
        password: "newpassword123",
      };

      // Mock pour le hachage du mot de passe
      (argon2.hash as jest.Mock).mockResolvedValue("newhashpassword");

      // Mock du repository
      (userRepository.update as jest.Mock).mockResolvedValue(true);
      (userRepository.readById as jest.Mock).mockResolvedValue({
        id: 8,
        name: "Updated",
        password_hash: "newhashpassword",
      });

      // Appel de la méthode à tester
      await userActions.edit(req as Request, res as Response, next);

      // Vérifications
      expect(argon2.hash).toHaveBeenCalledWith(
        "newpassword123",
        expect.any(Object),
      );
      expect(userRepository.update).toHaveBeenCalledWith(
        8,
        expect.objectContaining({
          name: "Updated",
          password_hash: "newhashpassword",
        }),
      );
    });
  });

  describe("updatePassword", () => {
    it("should update user password when current password is correct", async () => {
      // Configuration de la requête
      req.params = { id: "5" };
      req.body = {
        currentPassword: "currentpassword",
        newPassword: "newpassword123",
      };

      // Mock pour la vérification et le hachage du mot de passe
      (userRepository.readById as jest.Mock).mockResolvedValue({
        id: 5,
        password_hash: "currenthash",
      });
      (argon2.verify as jest.Mock).mockResolvedValue(true);
      (argon2.hash as jest.Mock).mockResolvedValue("newhashpassword");
      (userRepository.update as jest.Mock).mockResolvedValue(true);

      // Appel de la méthode à tester
      await userActions.updatePassword(req as Request, res as Response, next);

      // Vérifications
      expect(argon2.verify).toHaveBeenCalledWith(
        "currenthash",
        "currentpassword",
      );
      expect(argon2.hash).toHaveBeenCalledWith(
        "newpassword123",
        expect.any(Object),
      );
      expect(userRepository.update).toHaveBeenCalledWith(
        5,
        expect.objectContaining({
          password_hash: "newhashpassword",
        }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("should reject when current password is incorrect", async () => {
      // Configuration de la requête
      req.params = { id: "5" };
      req.body = {
        currentPassword: "wrongpassword",
        newPassword: "newpassword123",
      };

      // Mock pour la vérification du mot de passe
      (userRepository.readById as jest.Mock).mockResolvedValue({
        id: 5,
        password_hash: "currenthash",
      });
      (argon2.verify as jest.Mock).mockResolvedValue(false);

      // Appel de la méthode à tester
      await userActions.updatePassword(req as Request, res as Response, next);

      // Vérifications
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        error: expect.stringContaining("incorrect"),
      });
    });
  });

  describe("toggleBan", () => {
    it("should toggle user ban status", async () => {
      // Configuration de la requête
      req.params = { id: "7" };
      req.body = { is_banned: true };

      // Mock du repository
      (userRepository.toggleBan as jest.Mock).mockResolvedValue(1);

      // Appel de la méthode à tester
      await userActions.toggleBan(req as Request, res as Response, next);

      // Vérifications
      expect(userRepository.toggleBan).toHaveBeenCalledWith(7, true);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 404 when user is not found", async () => {
      // Configuration de la requête
      req.params = { id: "999" };
      req.body = { is_banned: true };

      // Mock du repository
      (userRepository.toggleBan as jest.Mock).mockResolvedValue(0);

      // Appel de la méthode à tester
      await userActions.toggleBan(req as Request, res as Response, next);

      // Vérifications
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("toggleAdmin", () => {
    it("should toggle user admin status", async () => {
      // Configuration de la requête
      req.params = { id: "7" };
      req.body = { is_admin: true };

      // Mock du repository
      (userRepository.toggleAdmin as jest.Mock).mockResolvedValue(1);

      // Appel de la méthode à tester
      await userActions.toggleAdmin(req as Request, res as Response, next);

      // Vérifications
      expect(userRepository.toggleAdmin).toHaveBeenCalledWith(7, true);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });

  describe("destroy", () => {
    it("should delete a user", async () => {
      // Configuration de la requête
      req.params = { id: "15" };

      // Mock du repository
      (userRepository.delete as jest.Mock).mockResolvedValue(true);

      // Appel de la méthode à tester
      await userActions.destroy(req as Request, res as Response, next);

      // Vérifications
      expect(userRepository.delete).toHaveBeenCalledWith(15);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("should return 404 when user to delete is not found", async () => {
      // Configuration de la requête
      req.params = { id: "999" };

      // Mock du repository
      (userRepository.delete as jest.Mock).mockResolvedValue(false);

      // Appel de la méthode à tester
      await userActions.destroy(req as Request, res as Response, next);

      // Vérifications
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });
});
