import bcrypt from "bcrypt";
import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id?: number;
  name: string;
  firstname: string;
  email: string;
  username: string;
  password_hash: string;
  phone_number?: string;
  profile_pic?: string | null;
  total_points: number;
  current_points: number;
};

class UserRepository {
  async create(
    user: Omit<
      User,
      "id" | "password_hash" | "total_points" | "current_points"
    > & { password: string },
  ) {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(user.password, saltRounds);

    const [result] = await databaseClient.query<Result>(
      `INSERT INTO user (
        name, firstname, email, username, 
        password_hash, phone_number, profile_pic,
        total_points, current_points
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0)`,
      [
        user.name,
        user.firstname,
        user.email,
        user.username,
        password_hash,
        user.phone_number || null,
        user.profile_pic || null,
      ],
    );

    return result.insertId;
  }

  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return rows[0] as User | undefined;
  }

  async readByUsername(username: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE username = ?",
      [username],
    );
    return rows[0] as User | undefined;
  }
}

export default new UserRepository();
