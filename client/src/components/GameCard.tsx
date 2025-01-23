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
  game: Game & { price: string };
}

export default function GamesCard({ game }: GamesCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/favorites`,
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
      <div className="gamecard-heart">
        <button
          type="button"
          className={`gamecard-heart-button ${isFavorite ? "favorite" : ""}`}
          onClick={toggleFavorite}
        >
          <Heart fill={isFavorite ? "#db9e2b" : "none"} stroke="currentColor" />
        </button>
      </div>
    </div>
  );
}
