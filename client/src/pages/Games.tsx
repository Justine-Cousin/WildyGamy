import logoWG from "../assets/images/logo_wildy_gamy.png";
import "../styles/games.css";
import galaga from "../assets/images/galaga.png";
import pacMan from "../assets/images/pac-man.png";
import spaceInvaders from "../assets/images/space-invaders.png";
import streetFighterII from "../assets/images/street-fighterII.png";
import GameCard from "../components/GameCard";

interface Game {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
}

const games: Game[] = [
  {
    id: 1,
    image: pacMan,
    name: "Pac man",
    description:
      "Pac-Man est un jeu d'arcade emblématique où vous dirigez un personnage jaune dans un labyrinthe. ",
    price: "1C",
  },
  {
    id: 2,
    image: streetFighterII,
    name: "Street Fighter",
    description:
      "Street Fighter est un jeu de combat légendaire où deux combattants s'affrontent en duel dans des arènes du monde entier. ",
    price: "2C",
  },
  {
    id: 3,
    image: galaga,
    name: "Galaga",
    description:
      "Galaga est un shoot'em up spatial où vous pilotez un vaisseau spatial qui doit défendre la Terre contre des vagues d'insectes extraterrestres. ",
    price: "2C",
  },
  {
    id: 4,
    image: spaceInvaders,
    name: "Space Invaders",
    description:
      "Space Invaders est le shoot'em up pionnier des jeux d'arcade où vous défendez la Terre contre des vagues d'aliens qui descendent inexorablement vers vous. ",
    price: "1C",
  },
];

const Games = () => {
  return (
    <div>
      <img className="games-logo" src={logoWG} alt="Logo" />
      <h1 className="games-title">NOS JEUX</h1>
      <div className="games-container">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Games;
