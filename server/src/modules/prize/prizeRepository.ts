import client from "../../../database/client";

const prizeRepository = {
  getAllPrizes: async () => {
    return client.query("SELECT * FROM prize ORDER BY exchange_price ASC");
  },

  getPrizeById: async (id: number) => {
    return client.query("SELECT * FROM prize WHERE id = ?", [id]);
  },
};

export default prizeRepository;
