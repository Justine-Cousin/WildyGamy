import databaseClient from "../../../database/client";
import type { Game } from "../games/gamesRepository";

class FavoritesRepository {
  async getUserFavorites(userId: number) {
    const [rows] = await databaseClient.query(
      `SELECT g.* FROM game g
       INNER JOIN favorite f ON f.game_id = g.id
       WHERE f.user_id = ?`,
      [userId],
    );
    return rows as Game[];
  }
}

export default new FavoritesRepository();
