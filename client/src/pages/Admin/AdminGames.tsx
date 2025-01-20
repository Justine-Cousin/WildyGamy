import { useEffect, useState } from "react";
import logoWG from "../../assets/images/logo_wildy_gamy.png";
import AddButton from "../../components/AddButton";
import AdminGrid from "../../components/AdminGrid";
import ModalAdminGame from "../../components/ModalAdminGame";
import SliderBarAdmin from "../../components/SliderBarAdmin";
import type { Game } from "../../services/types";
import "../../styles/AdminGames.css";

const DEFAULT_GAME = {
  id: 0,
  name: "",
  description: "",
  image: "",
  price: "",
};

const API_URL = import.meta.env.VITE_API_URL;

const AdminGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "add">("add");
  const [selectedGame, setSelectedGame] = useState(DEFAULT_GAME);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${API_URL}/api/games`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
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

  const handleEditClick = (game: {
    id: number;
    image: string;
    name: string;
    is_available: boolean;
    description: string;
    price: string;
  }) => {
    setModalMode("edit");
    setSelectedGame({
      id: game.id,
      name: game.name,
      description: game.description || "",
      image: game.image || "",
      price: game.price.toString(),
    });
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedGame(DEFAULT_GAME);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleSave = async (gameData: {
    name: string;
    description: string;
    image: string;
    price: string;
  }) => {
    try {
      if (modalMode === "add") {
        const response = await fetch(`${API_URL}/api/games`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...gameData,
            price: gameData.price,
            is_available: true,
          }),
        });

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();

        setGames([
          ...games,
          {
            ...gameData,
            id: data.id,
            is_available: true,
            price: Number(gameData.price),
          },
        ]);
      } else {
        await updateGame(selectedGame.id, {
          ...gameData,
          price: Number(gameData.price),
          is_available: true,
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    }
  };

  const updateGame = async (
    id: number,
    gameData: Omit<Game, "id"> & { price: number },
  ) => {
    try {
      const response = await fetch(`${API_URL}/api/games/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(gameData),
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      setGames(games.map((g) => (g.id === id ? { ...g, ...gameData } : g)));
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      throw error;
    }
  };

  const updateGameAvailability = async (id: number, isAvailable: boolean) => {
    try {
      const response = await fetch(`${API_URL}/api/games/${id}/availability`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isAvailable }),
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      setGames(
        games.map((game) =>
          game.id === id ? { ...game, is_available: isAvailable } : game,
        ),
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    }
  };

  const deleteGame = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/games/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      setGames(games.filter((game) => game.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      setError(
        error instanceof Error ? error.message : "Une erreur est survenue",
      );
    }
  };

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

  return (
    <div className="admingames-container">
      <img src={logoWG} alt="logo" className="admingames-logo" />
      <SliderBarAdmin isOpen={isOpen} onToggle={setIsOpen} />

      <div className={`main-content ${isOpen ? "main-content-shifted" : ""}`}>
        <div className="admingames-content">
          <div className="admingrid-card">
            {games.map((game) => (
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
                onEdit={handleEditClick}
                onUpdate={(id, data) =>
                  updateGame(id, {
                    name: data.name,
                    description: data.description,
                    image: data.image,
                    price: Number(data.price),
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
            ))}
          </div>
        </div>
      </div>

      <AddButton onClick={handleAddClick} />
      <ModalAdminGame
        key={isModalOpen ? "modal-open" : "modal-closed"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gameData={selectedGame}
        onSave={handleSave}
        mode={modalMode}
      />
    </div>
  );
};

export default AdminGames;
