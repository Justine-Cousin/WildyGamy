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
}

export default new gamesRepository();
