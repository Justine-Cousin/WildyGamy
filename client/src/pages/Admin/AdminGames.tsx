import { useState } from "react";
import ModalAdminGame from "../../components/ModalAdminGame";
import AdminItemGrid from "../../components/admin/AdminItemGrid";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAdminData } from "../../components/admin/useAdminData";
import type { Game } from "../../services/types";
import "../../styles/AdminGames.css";
import "../../styles/admin/AdminCommon.css";

const DEFAULT_GAME: Game = {
  id: 0,
  name: "",
  description: "",
  image: "",
  price: 0,
  is_available: true,
};

const AdminGames = () => {
  const {
    data: games,
    loading,
    error,
    updateItem,
    deleteItem,
    addItem,
    updateAvailability,
  } = useAdminData<Game>({
    fetchUrl: "/api/games",
    loadingMessage: "Motivation des fantômes de Pac-Man...",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "add">("add");
  const [selectedGame, setSelectedGame] = useState<Game>(DEFAULT_GAME);

  const handleEditClick = (game: Game) => {
    setModalMode("edit");
    setSelectedGame({
      ...game,
      description: game.description || "",
      image: game.image || "",
      price: game.price,
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
    price?: string;
    exchange_price?: string;
  }) => {
    try {
      if (modalMode === "add") {
        const newGame = {
          ...DEFAULT_GAME,
          ...gameData,
          price: Number(gameData.price),
          is_available: true,
        };
        await addItem(newGame);
      } else {
        const updatedGame = {
          ...gameData,
          price: Number(gameData.price),
        };
        await updateItem(selectedGame.id, updatedGame);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-page">
        <div className="admin-loading-message">
          Motivation des fantômes de Pac-Man...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-loading-page">
        <div className="admin-error-message">{error}</div>
      </div>
    );
  }

  return (
    <AdminLayout
      showAddButton={true}
      onAddClick={handleAddClick}
      containerClassName="admingames-container"
      contentClassName="admingames-content"
      logoClassName="admingames-logo"
    >
      <div className="admingrid-card">
        {games?.map((game) => (
          <AdminItemGrid
            key={game.id}
            id={game.id}
            type="game"
            game={game}
            onAvailabilityChange={updateAvailability}
            onEdit={handleEditClick}
            onDelete={deleteItem}
          />
        ))}
      </div>

      <ModalAdminGame
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gameData={{
          ...selectedGame,
          description: selectedGame.description || "",
          image: selectedGame.image || "",
          price: selectedGame.price?.toString() || "0",
        }}
        onSave={handleSave}
        mode={modalMode}
      />
    </AdminLayout>
  );
};

export default AdminGames;
