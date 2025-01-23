import { get } from "node:http";
import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type user = {
  id: number;
  name: string;
  firstname: string;
  email: string;
  username: string;
  phone_number: string;
  profile_pic: string;
  total_points: number;
  current_points: number;
};

class usersRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );
    return rows[0] as user;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user ORDER BY total_points DESC",
    );

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      firstname: row.firstname,
      email: row.email,
      username: row.username,
      phone_number: row.phone_number,
      profile_pic: row.profile_pic,
      total_points: row.total_points,
      current_points: row.current_points,
    }));
  }
}

export default new usersRepository();
