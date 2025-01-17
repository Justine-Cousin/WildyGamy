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

export interface BaseItem {
  id: number;
  name: string;
  description?: string;
  image?: string;
  is_available: boolean;
}

export interface Game extends BaseItem {
  price: number;
}

export interface Prize extends BaseItem {
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

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameData?: {
    name: string;
    description: string;
    image: string;
    price: string;
  };
  prizeData?: {
    name: string;
    description: string;
    image: string;
    exchange_price: string;
  };
  onSave: (updatedData: {
    name: string;
    description: string;
    image: string;
    price?: string;
    exchange_price?: string;
  }) => void;
  mode: "edit" | "add";
}

// Types pour les réponses API
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Types pour les requêtes API
export interface LoginRequest {
  username: string;
  password: string;
}

export interface CreateUserRequest {
  name: string;
  firstname: string;
  email: string;
  username: string;
  password: string;
  phone_number?: string;
  profile_pic?: string;
}

export interface UpdateUserRequest {
  name?: string;
  firstname?: string;
  email?: string;
  username?: string;
  password?: string;
  phone_number?: string;
  profile_pic?: string;
  total_points?: number;
  current_points?: number;
}
