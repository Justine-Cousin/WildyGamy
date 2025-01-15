import { useEffect, useState } from "react";
import logoWG from "../../assets/images/logo_wildy_gamy.png";
import AdminGrid from "../../components/AdminGrid";
import SliderBarAdmin from "../../components/SliderBarAdmin";
import type { Game } from "../../services/types";
import "../../styles/AdminGames.css";

const AdminGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleSidebarToggle = (open: boolean) => {
    setIsOpen(open);
  };

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
        <div className="games-page__loading">
          Motivation des fantômes de Pac-Man...
        </div>
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

  const updateGameAvailability = async (id: number, isAvailable: boolean) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/games/${id}/availability`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ isAvailable }),
        },
      );

      if (response.ok) {
        setGames(
          games.map((game) =>
            game.id === id ? { ...game, is_available: isAvailable } : game,
          ),
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    }
  };

  const updateGame = async (
    id: number,
    gameData: {
      name: string;
      description: string;
      image: string;
      price: number;
      is_available: boolean;
    },
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/games/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(gameData),
        },
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      setGames(games.map((g) => (g.id === id ? { ...g, ...gameData } : g)));
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    }
  };

  const deleteGame = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/games/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      setGames(games.filter((game) => game.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    }
  };

  return (
    <div className="admingames-container">
      <img src={logoWG} alt="logo" className="admingames-logo" />
      <SliderBarAdmin isOpen={isOpen} onToggle={handleSidebarToggle} />
      <div className={`main-content ${isOpen ? "main-content-shifted" : ""}`}>
        <div className="admingames-content">
          <div className="admingrid-card">
            {games.map((game) =>
              game.image && game.name ? (
                <AdminGrid
                  key={game.id}
                  id={game.id}
                  type="game"
                  game={{
                    id: game.id,
                    image: game.image,
                    name: game.name,
                    is_available: game.is_available,
                    description: game.description || "",
                    price: game.price.toString(),
                  }}
                  onAvailabilityChange={updateGameAvailability}
                  onUpdate={(
                    id: number,
                    data: {
                      name: string;
                      description: string;
                      image: string;
                      price: string;
                    },
                  ) =>
                    updateGame(id, {
                      ...game,
                      name: data.name,
                      description: data.description,
                      image: data.image,
                      price: Number.parseInt(data.price, 10),
                      is_available: game.is_available,
                    })
                  }
                  onDelete={() => {
                    if (
                      window.confirm(
                        "🎮 Suppression de jeu - Cette action est irréversible. Confirmer ?",
                      )
                    ) {
                      deleteGame(game.id);
                    }
                  }}
                />
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGames;
