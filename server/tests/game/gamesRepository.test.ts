import type { FieldPacket, OkPacket, RowDataPacket } from "mysql2";
// Import nécessaires
import databaseClient from "../../database/client";
import gamesRepository from "../../src/modules/games/gamesRepository";

// Restaurer les mocks après chaque test
afterEach(() => {
  jest.restoreAllMocks();
});

describe("gamesRepository", () => {
  // Test de la méthode read
  describe("read", () => {
    it("should return a game when found", async () => {
      // Simuler une réponse de la base de données
      const mockGame = {
        id: 1,
        name: "Test Game",
        description: "Description",
        price: 20,
        image: "image.jpg",
        is_available: true,
        is_new: false,
      };

      // Mocker la méthode query
      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [[mockGame], []] as [RowDataPacket[], FieldPacket[]],
        );

      // Appeler la méthode
      const result = await gamesRepository.read(1);

      // Vérifications
      expect(result).toEqual(mockGame);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("select * from game where id = ?"),
        [1],
      );
    });

    it("should return undefined when game is not found", async () => {
      // Simuler une réponse vide
      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [[], []] as [RowDataPacket[], FieldPacket[]],
        );

      // Appeler la méthode
      const result = await gamesRepository.read(999);

      // Vérifications
      expect(result).toBeUndefined();
    });
  });

  // Test de la méthode readAll
  describe("readAll", () => {
    it("should return all games", async () => {
      // Simuler des jeux
      const mockGames = [
        { id: 1, name: "Game 1", is_available: true, is_new: false },
        { id: 2, name: "Game 2", is_available: true, is_new: true },
      ];

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockGames, []] as [RowDataPacket[], FieldPacket[]],
        );

      // Appeler la méthode
      const result = await gamesRepository.readAll();

      // Vérifications
      expect(result).toEqual(mockGames);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("select * from game ORDER BY name ASC"),
      );
    });
  });

  // Test des méthodes spécifiques
  describe("readAllAvailable", () => {
    it("should return only available games", async () => {
      // Simuler des jeux disponibles
      const mockGames = [
        { id: 1, name: "Game 1", is_available: true, is_new: false },
      ];

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockGames, []] as [RowDataPacket[], FieldPacket[]],
        );

      // Appeler la méthode
      const result = await gamesRepository.readAllAvailable();

      // Vérifications
      expect(result).toEqual(mockGames);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("where is_available = 1"),
      );
    });
  });

  // Test de la méthode create
  describe("create", () => {
    it("should create a new game and return the ID", async () => {
      // Simuler un ID d'insertion
      const mockResult = { insertId: 5 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      // Données du nouveau jeu
      const newGame = {
        name: "New Game",
        description: "New Description",
        price: 29.99,
        image: "new-image.jpg",
        is_available: true,
        is_new: true,
      };

      // Appeler la méthode
      const result = await gamesRepository.create(newGame);

      // Vérifications
      expect(result).toBe(5);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("insert into game"),
        expect.arrayContaining([newGame.name, newGame.description]),
      );
    });
  });

  // Test de la méthode update
  describe("update", () => {
    it("should update a game and return affected rows", async () => {
      // Simuler résultat de mise à jour
      const mockResult = { affectedRows: 1 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      // Données à mettre à jour
      const gameToUpdate = {
        id: 3,
        name: "Updated Game",
        description: "Updated Description",
        price: 39.99,
        image: "updated-image.jpg",
        is_available: true,
        is_new: false,
      };

      // Appeler la méthode
      const result = await gamesRepository.update(gameToUpdate);

      // Vérifications
      expect(result).toBe(1);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("update game set"),
        expect.arrayContaining([gameToUpdate.name, gameToUpdate.id]),
      );
    });
  });

  // Test de la méthode delete
  describe("delete", () => {
    it("should delete a game and return affected rows", async () => {
      // Simuler résultat de suppression
      const mockResult = { affectedRows: 1 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      // Appeler la méthode
      const result = await gamesRepository.delete(7);

      // Vérifications
      expect(result).toBe(1);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("delete from game where id = ?"),
        [7],
      );
    });
  });
});
