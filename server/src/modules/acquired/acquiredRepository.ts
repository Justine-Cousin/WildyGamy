import databaseClient from "../../../database/client";

class AcquiredRepository {
  async read(userId: number) {
    const [rows] = await databaseClient.query(
      `SELECT p.* FROM prize p
       INNER JOIN prize_acquired pa ON pa.prize_id = p.id
       WHERE pa.user_id = ?`,
      [userId],
    );
    return rows;
  }
}

export default new AcquiredRepository();
