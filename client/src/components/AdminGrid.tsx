import { Eye, EyeClosed, PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import type React from "react";
import "../styles/AdminGrid.css";
import EditModalAdminGame from "./ModalAdminGame";

type AdminGridProps = {
  type: string;
  id: number;
  game?: {
    id: number;
    image: string;
    name: string;
    is_available: boolean;
    description: string;
    price: string;
  };
  price?: { image: string; name: string };
  onAvailabilityChange: (id: number, isAvailable: boolean) => void;
  onEdit?: (game: {
    id: number;
    image: string;
    name: string;
    is_available: boolean;
    description: string;
    price: string;
  }) => void; // Ajout de la prop onEdit
  onUpdate?: (
    id: number,
    data: { name: string; description: string; image: string; price: string },
  ) => void;
  onDelete: (id: number) => void;
};

const AdminGrid: React.FC<AdminGridProps> = ({
  type,
  game,
  price,
  onAvailabilityChange,
  onUpdate,
  onEdit,
  onDelete,
}) => {
  const [isavailable, setIsAvailable] = useState(game?.is_available ?? true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      window.confirm(
        "🎮 Suppression de jeu - Cette action est irréversible. Confirmer ?",
      )
    ) {
      if (game) {
        onDelete(game.id);
      }
    }
  };

  switch (type) {
    case "game":
      return (
        <div
          className={`admincard-content ${
            isavailable
              ? "admincard-content-available"
              : "admincard-content-unavailable"
          }`}
        >
          {game && (
            <div className="admincard-availability">
              <div className="admincard-content-info">
                <img
                  className="gamecard-image"
                  src={game.image}
                  alt={game.name}
                />
                <div className="adminCard-info">
                  <h3 className="adminCard-name">{game.name}</h3>
                </div>
              </div>
            </div>
          )}
          <div className="admincard-buttons">
            <button
              type="button"
              onClick={() => {
                const newAvailability = !isavailable;
                setIsAvailable(newAvailability);
                if (game) {
                  onAvailabilityChange(game.id, newAvailability);
                }
              }}
              className="admincard-button"
            >
              {isavailable ? (
                <Eye className="admingrid-eye" />
              ) : (
                <EyeClosed className="admingrid-eye" />
              )}
            </button>
            <button
              type="button"
              className="admincard-button edit-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (game && onEdit) {
                  onEdit(game);
                } else {
                  setIsEditModalOpen(true);
                }
              }}
            >
              <PencilLine className="admingrid-pencil" />
            </button>
            {isEditModalOpen && game && (
              <EditModalAdminGame
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                gameData={{
                  name: game.name,
                  description: game.description,
                  image: game.image,
                  price: game.price,
                }}
                onSave={(updatedData) => {
                  if (onUpdate) {
                    onUpdate(game.id, updatedData);
                  }
                  setIsEditModalOpen(false);
                }}
              />
            )}
            <button
              type="button"
              className="admincard-button trash-button"
              onClick={handleDelete}
            >
              <Trash2 className="admingrid-trash" />
            </button>
          </div>
        </div>
      );

    case "price":
      return (
        <div className="admincard-content prizecard-content">
          {price && (
            <>
              <img
                className="pricecard-img"
                src={price.image}
                alt={price.name}
              />
              <div className="adminCard-info">
                <h3 className="adminCard-name">{price.name}</h3>
              </div>
            </>
          )}
        </div>
      );

    default:
      return null;
  }
};

export default AdminGrid;
