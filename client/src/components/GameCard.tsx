import "../styles/GameCard.css";
import coin from "../assets/images/coin.svg";
import logoWG from "../assets/images/logo_wildy_gamy.png";

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
  return (
    <div key={game.id} className="gamecard-content">
      <img
        className="gamecard-image"
        src={game.image || logoWG}
        alt={game.name}
      />
      <p className="gamecard-description">{game.description}</p>
      <div className="gamecard-price-container">
        <img src={coin} className="gamecard-img-coin" alt="coin" />
        <p className="gamecard-price">{game.price}</p>
      </div>
    </div>
  );
}
