import "../styles/GameCard.css";
import { Coins, Heart } from "lucide-react";
import { useState } from "react";

interface Game {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
}

interface GamesCardProps {
  game: Game;
}

export default function GamesCard({ game }: GamesCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div key={game.id} className="gamecard-content">
      <img className="gamecard-image" src={game.image} alt={game.name} />
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
