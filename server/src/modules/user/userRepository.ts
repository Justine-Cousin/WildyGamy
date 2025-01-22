import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  name: string;
  firstname: string;
  email: string;
  username: string;
  password_hash: string;
  phone_number?: string | null;
  profile_pic?: string | null;
  total_points: number;
  current_points: number;
};

type CreateUserInput = Omit<
  User,
  "id" | "password_hash" | "total_points" | "current_points"
> & {
  password_hash: string;
};

class UserRepository {
  async create(user: CreateUserInput) {
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
        user.password_hash,
        user.phone_number || null,
        user.profile_pic || null,
      ],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");
    return rows as User[];
  }

  async readByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );
    return rows[0] as User | undefined;
  }

  async readByEmailWithPassword(email: string) {
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
