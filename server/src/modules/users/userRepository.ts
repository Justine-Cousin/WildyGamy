import client from "../../../database/client";

interface UserData {
  name: string;
  firstname: string;
  email: string;
  username: string;
  password_hash: string;
  phone_number?: string;
  profile_pic?: string;
  total_points: number;
  current_points: number;
}

const userRepository = {
  getAllUsers: async () => {
    return client.query("SELECT * FROM user");
  },

  getUserById: async (id: number) => {
    return client.query("SELECT * FROM user WHERE id = ?", [id]);
  },
  getUserByEmail: async (email: string) => {
    return client.query("SELECT * FROM user WHERE email = ?", [email]);
  },
  getUserByUsername: async (username: string) => {
    return client.query("SELECT * FROM user WHERE username = ?", [username]);
  },

  createUser: async (userData: UserData) => {
    const query = `
      INSERT INTO user (
        name, 
        firstname, 
        email, 
        username, 
        password_hash, 
        phone_number, 
        profile_pic, 
        total_points, 
        current_points
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      userData.name,
      userData.firstname,
      userData.email,
      userData.username,
      userData.password_hash,
      userData.phone_number || null,
      userData.profile_pic || null,
      userData.total_points,
      userData.current_points,
    ];
    return client.query(query, values);
  },
};

export default userRepository;
