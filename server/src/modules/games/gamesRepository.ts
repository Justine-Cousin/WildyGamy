import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type game = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
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
}

export default new gamesRepository();
