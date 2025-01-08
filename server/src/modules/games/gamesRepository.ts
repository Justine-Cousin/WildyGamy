import client from "../../../database/client";

const gamesRepository = {
  getAllGames: async () => {
    return client.query("SELECT * FROM game");
  },

  getGamesID: async (id: number) => {
    return client.query("SELECT * FROM game WHERE id = ?", [id]);
  },
};

export default gamesRepository;
