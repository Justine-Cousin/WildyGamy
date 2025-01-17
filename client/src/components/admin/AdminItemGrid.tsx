import { Eye, EyeClosed, PencilLine, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { Game, Prize } from "../../services/types";
import "../../styles/admin/AdminCommon.css";

interface AdminItemGridProps {
  id: number;
  type: "game" | "prize";
  game?: Omit<Game, "description" | "image"> & {
    description?: string;
    image?: string;
  };
  prize?: Prize;
  onAvailabilityChange?: (id: number, isAvailable: boolean) => void;
  onEdit?: EditHandler<Game> | EditHandler<Prize>;
  onDelete?: (id: number) => void;
}

type EditHandler<T> = (item: NonNullable<T>) => void;

const AdminItemGrid: React.FC<AdminItemGridProps> = ({
  id,
  type,
  game,
  prize,
  onAvailabilityChange,
  onEdit,
  onDelete,
}) => {
  const [isAvailable, setIsAvailable] = useState(
    type === "game"
      ? (game?.is_available ?? true)
      : (prize?.is_available ?? true),
  );

  const item = type === "game" ? game : prize;
  if (!item) return null;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      window.confirm(
        `🎮 Suppression de ${
          type === "game" ? "jeu" : "lot"
        } - Cette action est irréversible. Confirmer ?`,
      )
    ) {
      onDelete?.(id);
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEdit && item) {
      if (type === "game" && game) {
        (onEdit as EditHandler<typeof game>)(game);
      } else if (type === "prize" && prize) {
        (onEdit as EditHandler<typeof prize>)(prize);
      }
    }
  };

  const handleAvailabilityChange = () => {
    const newAvailability = !isAvailable;
    setIsAvailable(newAvailability);
    onAvailabilityChange?.(id, newAvailability);
  };

  return (
    <div
      className={`admincard-content ${type === "prize" ? "prizecard-content" : ""} ${
        isAvailable
          ? "admincard-content-available"
          : "admincard-content-unavailable"
      }`}
    >
      <div className="admincard-content-info">
        <img
          className={type === "game" ? "gamecard-image" : "pricecard-img"}
          src={item.image || ""}
          alt={item.name}
        />
        <div className="adminCard-info">
          <h3 className="adminCard-name">{item.name}</h3>
        </div>
      </div>

      <div className="admincard-buttons">
        {onAvailabilityChange && (
          <button
            type="button"
            onClick={handleAvailabilityChange}
            className="admincard-button"
            title={isAvailable ? "Rendre invisible" : "Rendre visible"}
          >
            {isAvailable ? (
              <Eye className="admingrid-eye" />
            ) : (
              <EyeClosed className="admingrid-eye" />
            )}
          </button>
        )}

        {onEdit && (
          <button
            type="button"
            className="admincard-button edit-button"
            onClick={handleEdit}
            title="Modifier"
          >
            <PencilLine className="admingrid-pencil" />
          </button>
        )}

        {onDelete && (
          <button
            type="button"
            className="admincard-button trash-button"
            onClick={handleDelete}
            title="Supprimer"
          >
            <Trash2 className="admingrid-trash" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminItemGrid;
