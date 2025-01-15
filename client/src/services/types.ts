export interface User {
  id: number;
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

export interface Game {
  id: number;
  name: string;
  description?: string;
  image?: string;
  price: number;
  is_available: boolean;
}

export interface Prize {
  id: number;
  name: string;
  description?: string;
  image?: string;
  exchange_price: number;
}

export interface Favorite {
  id: number;
  user_id: number;
  game_id: number;
}

export interface PrizeAcquired {
  id: number;
  user_id: number;
  prize_id: number;
  acquisition_date: Date;
}
