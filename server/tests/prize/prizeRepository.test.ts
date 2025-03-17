import type { FieldPacket, OkPacket, RowDataPacket } from "mysql2";
import databaseClient from "../../database/client";
import prizeRepository from "../../src/modules/prize/prizeRepository";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("prizeRepository", () => {
  describe("read", () => {
    it("should return a prize when found", async () => {
      const mockPrize = {
        id: 1,
        name: "Test Prize",
        description: "Description",
        exchange_price: 50,
        image: "image.jpg",
        is_available: true,
      };

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [[mockPrize], []] as [RowDataPacket[], FieldPacket[]],
        );

      const result = await prizeRepository.read(1);

      expect(result).toEqual(mockPrize);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("select * from prize where id = ?"),
        [1],
      );
    });

    it("should return undefined when prize is not found", async () => {
      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [[], []] as [RowDataPacket[], FieldPacket[]],
        );

      const result = await prizeRepository.read(999);

      expect(result).toBeUndefined();
    });
  });

  describe("readAll", () => {
    it("should return all prizes", async () => {
      const mockPrizes = [
        { id: 1, name: "Prize 1", exchange_price: 20, is_available: true },
        { id: 2, name: "Prize 2", exchange_price: 40, is_available: true },
      ];

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockPrizes, []] as [RowDataPacket[], FieldPacket[]],
        );

      const result = await prizeRepository.readAll();

      expect(result).toEqual(mockPrizes);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining(
          "select * from prize ORDER BY exchange_price ASC",
        ),
      );
    });
  });

  describe("readAllAvailable", () => {
    it("should return only available prizes", async () => {
      const mockPrizes = [
        { id: 1, name: "Prize 1", exchange_price: 20, is_available: true },
      ];

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockPrizes, []] as [RowDataPacket[], FieldPacket[]],
        );

      const result = await prizeRepository.readAllAvailable();

      expect(result).toEqual(mockPrizes);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("where is_available = 1"),
      );
    });
  });

  describe("create", () => {
    it("should create a new prize and return the ID", async () => {
      const mockResult = { insertId: 5 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      const newPrize = {
        name: "New Prize",
        description: "New Description",
        exchange_price: 60,
        image: "new-image.jpg",
        is_available: true,
      };

      const result = await prizeRepository.create(newPrize);

      expect(result).toBe(5);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("insert into prize"),
        expect.arrayContaining([newPrize.name, newPrize.description]),
      );
    });
  });

  describe("update", () => {
    it("should update a prize and return affected rows", async () => {
      const mockResult = { affectedRows: 1 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      const prizeToUpdate = {
        id: 3,
        name: "Updated Prize",
        description: "Updated Description",
        exchange_price: 75,
        image: "updated-image.jpg",
        is_available: true,
      };

      const result = await prizeRepository.update(prizeToUpdate);

      expect(result).toBe(1);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("update prize set"),
        expect.arrayContaining([prizeToUpdate.name, prizeToUpdate.id]),
      );
    });
  });

  describe("delete", () => {
    it("should delete a prize and return affected rows", async () => {
      const mockResult = { affectedRows: 1 } as OkPacket;

      jest
        .spyOn(databaseClient, "query")
        .mockImplementation(
          async () => [mockResult, []] as [OkPacket, FieldPacket[]],
        );

      const result = await prizeRepository.delete(7);

      expect(result).toBe(1);
      expect(databaseClient.query).toHaveBeenCalledWith(
        expect.stringContaining("delete from prize where id = ?"),
        [7],
      );
    });
  });
});
