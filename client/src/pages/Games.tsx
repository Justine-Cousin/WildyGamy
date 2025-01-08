import logoWG from "../assets/images/logo_wildy_gamy.png";
import "../styles/games.css";
import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

const Games = () => {
  interface Game {
    id: number;
    image: string;
    name: string;
    description: string;
    price: string;
  }

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/games`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des jeux:", error);
        setError(
          error instanceof Error ? error.message : "Une erreur est survenue",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="games-page">
        <div className="games-page__loading">Chargement...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="games-page">
        <div className="games-page__error">{error}</div>
      </div>
    );
  }

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
