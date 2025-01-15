import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type game = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  is_available: boolean;
};

class gamesRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from game where id = ?",
      [id],
    );

    return rows[0] as game;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from game");

    return rows as game[];
  }

  async readAllAvailable() {
    const [rows] = await databaseClient.query<Rows>(
      "select * from game where is_available = 1",
    );

    return rows as game[];
  }

  async updateAvailability(id: number, isAvailable: boolean) {
    await databaseClient.query<Result>(
      "update game set is_available = ? where id = ?",
      [isAvailable, id],
    );
  }

  async update(game: game) {
    const [result] = await databaseClient.query<Result>(
      "update game set name = ?, description = ?, price = ?, image = ?, is_available = ? where id = ?",
      [
        game.name,
        game.description,
        game.price,
        game.image,
        game.is_available,
        game.id,
      ],
    );

    return result.affectedRows;
  }
  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from game where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new gamesRepository();
