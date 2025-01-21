import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

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
export type createUser = Omit<user, "id">;

class usersRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    return rows[0] as user;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from user");

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

  async update(user: createUser & { id: number }) {
    const [result] = await databaseClient.query<Result>(
      "update user set name = ?, firstname = ?, email = ?, username = ?, phone_number = ?, profile_pic = ?, total_points = ?, current_points = ? where id = ?",
      [
        user.name,
        user.firstname,
        user.email,
        user.username,
        user.phone_number,
        user.profile_pic,
        user.total_points,
        user.current_points,
        user.id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from user where id = ?",
      [id],
    );
    return result.affectedRows;
  }

  async create(user: createUser) {
    const [result] = await databaseClient.query<Result>(
      "insert into user (name, firstname, email, username, phone_number, profile_pic, total_points, current_points) values (?, ?, ?, ?, ?, ?)",
      [
        user.name,
        user.firstname,
        user.email,
        user.username,
        user.phone_number,
        user.profile_pic,
        user.total_points,
        user.current_points,
      ],
    );

    return result.insertId;
  }
}

export default new usersRepository();
