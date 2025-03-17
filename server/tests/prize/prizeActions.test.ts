import type { NextFunction, Request, Response } from "express";
import type { UploadedFile } from "express-fileupload";
import cloudinary from "../../src/middleware/cloudinary";
import prizeActions from "../../src/modules/prize/prizeActions";
import prizeRepository from "../../src/modules/prize/prizeRepository";

jest.mock("../../src/modules/prize/prizeRepository");
jest.mock("../../src/middleware/cloudinary", () => ({
  uploader: {
    upload: jest.fn(),
  },
}));

describe("prizeActions", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
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

    jest.clearAllMocks();
  });

  describe("browse", () => {
    it("should return all prizes", async () => {
      const mockPrizes = [
        {
          id: 1,
          name: "Prize 1",
          description: "Description 1",
          exchange_price: 30,
        },
        {
          id: 2,
          name: "Prize 2",
          description: "Description 2",
          exchange_price: 50,
        },
      ];

      (prizeRepository.readAll as jest.Mock).mockResolvedValue(mockPrizes);

      await prizeActions.browse(req as Request, res as Response, next);

      expect(prizeRepository.readAll).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockPrizes);
    });

    it("should handle errors", async () => {
      const error = new Error("Database error");
      (prizeRepository.readAll as jest.Mock).mockRejectedValue(error);

      await prizeActions.browse(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("browseAvailable", () => {
    it("should return only available prizes", async () => {
      const mockAvailablePrizes = [
        { id: 1, name: "Prize 1", is_available: true },
      ];

      (prizeRepository.readAllAvailable as jest.Mock).mockResolvedValue(
        mockAvailablePrizes,
      );

      await prizeActions.browseAvailable(req as Request, res as Response, next);

      expect(prizeRepository.readAllAvailable).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockAvailablePrizes);
    });
  });

  describe("read", () => {
    it("should return a specific prize when found", async () => {
      req.params = { id: "5" };

      const mockPrize = {
        id: 5,
        name: "Prize 5",
        description: "Description 5",
      };

      (prizeRepository.read as jest.Mock).mockResolvedValue(mockPrize);

      await prizeActions.read(req as Request, res as Response, next);

      expect(prizeRepository.read).toHaveBeenCalledWith(5);
      expect(res.json).toHaveBeenCalledWith(mockPrize);
    });

    it("should return 404 when prize is not found", async () => {
      req.params = { id: "999" };

      (prizeRepository.read as jest.Mock).mockResolvedValue(null);

      await prizeActions.read(req as Request, res as Response, next);

      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("add", () => {
    it("should create a new prize", async () => {
      req.body = {
        name: "New Prize",
        description: "New Description",
        exchange_price: "45",
        is_available: true,
      };

      const newPrizeId = 10;
      const createdPrize = { id: 10, ...req.body, exchange_price: 45 };

      (prizeRepository.create as jest.Mock).mockResolvedValue(newPrizeId);
      (prizeRepository.read as jest.Mock).mockResolvedValue(createdPrize);

      await prizeActions.add(req as Request, res as Response, next);

      expect(prizeRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "New Prize",
          description: "New Description",
          exchange_price: 45,
          is_available: true,
        }),
      );
      expect(prizeRepository.read).toHaveBeenCalledWith(newPrizeId);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdPrize);
    });

    it("should handle image upload", async () => {
      const mockFile = {
        tempFilePath: "/tmp/test-image.jpg",
        mimetype: "image/jpeg", // Ajout du type MIME nécessaire pour la validation
        name: "test-image.jpg",
      } as UploadedFile;

      req.files = { image: mockFile };
      req.body = {
        name: "Prize with Image",
        description: "Description",
        exchange_price: "60",
      };

      const cloudinaryResult = {
        secure_url: "https://cloudinary.com/image.jpg",
      };
      (cloudinary.uploader.upload as jest.Mock).mockResolvedValue(
        cloudinaryResult,
      );

      const newPrizeId = 11;
      const createdPrize = {
        id: 11,
        name: "Prize with Image",
        description: "Description",
        exchange_price: 60,
        image: "https://cloudinary.com/image.jpg",
        is_available: true,
      };
      (prizeRepository.create as jest.Mock).mockResolvedValue(newPrizeId);
      (prizeRepository.read as jest.Mock).mockResolvedValue(createdPrize);

      await prizeActions.add(req as Request, res as Response, next);

      expect(cloudinary.uploader.upload).toHaveBeenCalledWith(
        mockFile.tempFilePath,
        expect.objectContaining({ folder: "prizes" }),
      );
      expect(prizeRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Prize with Image",
          description: "Description",
          exchange_price: 60,
          image: "https://cloudinary.com/image.jpg",
          is_available: true,
        }),
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdPrize);
    });
  });

  describe("updateAvailability", () => {
    it("should update prize availability", async () => {
      req.params = { id: "7" };
      req.body = { isAvailable: true };

      (prizeRepository.updateAvailability as jest.Mock).mockResolvedValue(
        undefined,
      );

      await prizeActions.updateAvailability(
        req as Request,
        res as Response,
        next,
      );

      expect(prizeRepository.updateAvailability).toHaveBeenCalledWith(7, true);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });

  describe("edit", () => {
    it("should update a prize", async () => {
      req.params = { id: "8" };
      req.body = {
        name: "Updated Prize",
        description: "Updated Description",
        exchange_price: "70",
        image: "existing-image.jpg",
      };

      const updatedPrize = { id: 8, ...req.body, exchange_price: 70 };
      (prizeRepository.update as jest.Mock).mockResolvedValue(1);
      (prizeRepository.read as jest.Mock).mockResolvedValue(updatedPrize);

      await prizeActions.edit(req as Request, res as Response, next);

      expect(prizeRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 8,
          name: "Updated Prize",
        }),
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedPrize);
    });

    it("should return 404 when prize to update is not found", async () => {
      req.params = { id: "999" };
      req.body = { name: "Non-existent Prize" };

      (prizeRepository.update as jest.Mock).mockResolvedValue(0);

      await prizeActions.edit(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe("destroy", () => {
    it("should delete a prize", async () => {
      req.params = { id: "15" };

      (prizeRepository.delete as jest.Mock).mockResolvedValue(1);

      await prizeActions.destroy(req as Request, res as Response, next);

      expect(prizeRepository.delete).toHaveBeenCalledWith(15);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
