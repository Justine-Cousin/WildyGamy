import "../styles/GameCard.css";
import { Coins, Heart } from "lucide-react";
import { useState } from "react";
import logoWG from "../assets/images/logo_wildy_gamy.png";

export interface Game {
  id: number;

  image: string;

  name: string;

  description: string;

  price: string;
}

interface GamesCardProps {
  game: Game;
  userId?: number;
}

export default function GamesCard({ game, userId }: GamesCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    try {
      if (!isFavorite) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${userId}/favorites`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ gameId: game.id }),
          },
        );
        if (!response.ok) {
          throw new Error("Error while adding favorite");
        }
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/${userId}/favorites`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ gameId: game.id }),
          },
        );
        if (!response.ok) {
          throw new Error("Error while deleting favorite");
        }
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div key={game.id} className="gamecard-content">
      <img
        className="gamecard-image"
        src={game.image || logoWG}
        alt={game.name}
      />
      <p className="gamecard-description">{game.description}</p>
      <div className="gamecard-price-container">
        <Coins className="gamecard-img-coin" />
        <p className="gamecard-price">{game.price}</p>
      </div>
      {userId && (
        <div className="gamecard-heart">
          <button
            type="button"
            className={`gamecard-heart-button ${isFavorite ? "favorite" : ""}`}
            onClick={toggleFavorite}
          >
            <Heart
              fill={isFavorite ? "#db9e2b" : "none"}
              stroke="currentColor"
            />
          </button>
        </div>
      )}
    </div>
  );
}
