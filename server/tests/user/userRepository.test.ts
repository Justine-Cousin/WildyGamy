import type { FieldPacket, OkPacket, RowDataPacket } from "mysql2";
import databaseClient from "../../database/client";
import userRepository from "../../src/modules/user/userRepository";

// Restaurer les mocks après chaque test
afterEach(() => {
  jest.restoreAllMocks();
});

describe("userRepository", () => {
  // Test de la méthode readAll
  describe("readAll", () => {
    it("should return all users", async () => {
      // Simuler une réponse de la base de données
      const mockUsers = [
        {
          id: 1,
          name: "User1",
          firstname: "First1",
          email: "user1@test.com",
          username: "user1",
          total_points: 500,
        },
        {
          id: 2,
          name: "User2",
          firstname: "First2",
          email: "user2@test.com",
          username: "user2",
          total_points: 300,
        },
      ];

      // Mocker la méthode query
      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockUsers, []] as [RowDataPacket[], FieldPacket[]],
        );

      // Appeler la méthode
      const result = await userRepository.readAll();

      // Vérifications
      expect(result).toEqual(mockUsers);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining(
          "SELECT * FROM user ORDER BY total_points DESC",
        ),
      );
    });
  });

  // Test de la méthode readById
  describe("readById", () => {
    it("should return a user when found", async () => {
      // Simuler une réponse de la base de données
      const mockUser = {
        id: 5,
        name: "Test",
        firstname: "User",
        email: "test@example.com",
        username: "testuser",
        total_points: 150,
        current_points: 50,
        highscore: 200,
        is_admin: 0,
        is_banned: 0,
      };

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [[mockUser], []] as [RowDataPacket[], FieldPacket[]],
        );

      // Appeler la méthode
      const result = await userRepository.readById(5);

      // Vérifications
      expect(result).toEqual(mockUser);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM user WHERE id = ?"),
        [5],
      );
    });

    it("should return undefined when user is not found", async () => {
      // Simuler une réponse vide
      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [[], []] as [RowDataPacket[], FieldPacket[]],
        );

      // Appeler la méthode
      const result = await userRepository.readById(999);

      // Vérifications
      expect(result).toBeUndefined();
    });
  });

  // Test des méthodes de recherche par email et username
  describe("readByEmail", () => {
    it("should return a user when email is found", async () => {
      // Simuler une réponse de la base de données
      const mockUser = {
        id: 3,
        name: "Email",
        firstname: "Test",
        email: "email.test@example.com",
      };

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [[mockUser], []] as [RowDataPacket[], FieldPacket[]],
        );

      // Appeler la méthode
      const result = await userRepository.readByEmail("email.test@example.com");

      // Vérifications
      expect(result).toEqual(mockUser);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM user WHERE email = ?"),
        ["email.test@example.com"],
      );
    });
  });

  describe("readByUsername", () => {
    it("should return a user when username is found", async () => {
      // Simuler une réponse de la base de données
      const mockUser = {
        id: 4,
        name: "Username",
        firstname: "Test",
        username: "usernametest",
      };

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [[mockUser], []] as [RowDataPacket[], FieldPacket[]],
        );

      // Appeler la méthode
      const result = await userRepository.readByUsername("usernametest");

      // Vérifications
      expect(result).toEqual(mockUser);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM user WHERE username = ?"),
        ["usernametest"],
      );
    });
  });

  // Test de la méthode create
  describe("create", () => {
    it("should create a new user and return the ID", async () => {
      // Simuler un ID d'insertion
      const mockResult = { insertId: 10 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      // Données du nouvel utilisateur
      const newUser = {
        name: "New",
        firstname: "User",
        email: "new.user@example.com",
        username: "newuser",
        password_hash: "hashedpassword123",
        phone_number: "1234567890",
        profile_pic: null,
        highscore: 0,
        is_banned: 0,
        is_admin: 0,
      };

      // Appeler la méthode
      const result = await userRepository.create(newUser);

      // Vérifications
      expect(result).toBe(10);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO user"),
        expect.arrayContaining([
          newUser.name,
          newUser.firstname,
          newUser.email,
          newUser.username,
          newUser.password_hash,
        ]),
      );
    });
  });

  // Test de la méthode update
  describe("update", () => {
    it("should update a user and return true if successful", async () => {
      // Simuler résultat de mise à jour
      const mockResult = { affectedRows: 1 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      // Données à mettre à jour
      const updates = {
        name: "Updated",
        firstname: "User",
        email: "updated@example.com",
      };

      // Appeler la méthode
      const result = await userRepository.update(8, updates);

      // Vérifications
      expect(result).toBe(true);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE user SET"),
        expect.arrayContaining([
          updates.name,
          updates.firstname,
          updates.email,
          8,
        ]),
      );
    });

    it("should return false if user not found", async () => {
      // Simuler résultat de mise à jour sans lignes affectées
      const mockResult = { affectedRows: 0 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      // Appeler la méthode
      const result = await userRepository.update(999, { name: "Not Found" });

      // Vérifications
      expect(result).toBe(false);
    });
  });

  // Test de méthodes spécifiques
  describe("updateHighscore", () => {
    it("should update user highscore", async () => {
      // Simuler résultat de mise à jour
      const mockResult = { affectedRows: 1 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      // Appeler la méthode
      const result = await userRepository.updateHighscore(5, 500);

      // Vérifications
      expect(result).toBe(true);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE user SET highscore = ? WHERE id = ?"),
        [500, 5],
      );
    });
  });

  describe("toggleBan", () => {
    it("should toggle user ban status", async () => {
      // Simuler résultat de mise à jour
      const mockResult = { affectedRows: 1 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      // Appeler la méthode pour bannir l'utilisateur
      const result = await userRepository.toggleBan(7, true);

      // Vérifications
      expect(result).toBe(1);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE user SET is_banned = ? WHERE id = ?"),
        [1, 7],
      );
    });
  });

  describe("toggleAdmin", () => {
    it("should toggle user admin status", async () => {
      // Simuler résultat de mise à jour
      const mockResult = { affectedRows: 1 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      // Appeler la méthode pour donner les droits admin
      const result = await userRepository.toggleAdmin(7, true);

      // Vérifications
      expect(result).toBe(1);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE user SET is_admin = ? WHERE id = ?"),
        [1, 7],
      );
    });
  });

  // Test de la méthode delete
  describe("delete", () => {
    it("should delete a user and return true if successful", async () => {
      // Simuler résultat de suppression
      const mockResult = { affectedRows: 1 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      // Appeler la méthode
      const result = await userRepository.delete(7);

      // Vérifications
      expect(result).toBe(true);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("DELETE FROM user WHERE id = ?"),
        [7],
      );
    });

    it("should return false if user not found", async () => {
      // Simuler résultat de suppression sans lignes affectées
      const mockResult = { affectedRows: 0 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      // Appeler la méthode
      const result = await userRepository.delete(999);

      // Vérifications
      expect(result).toBe(false);
    });
  });
});
