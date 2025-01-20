import {
  Coins,
  Eye,
  EyeClosed,
  PencilLine,
  Tickets,
  Trash2,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import logoWG from "../../assets/images/logo_wildy_gamy.png";
import type { Game, Prize, User } from "../../services/types";
import "../../styles/admin/AdminCommon.css";

interface AdminItemGridProps<T> {
  id: number;
  type: "game" | "prize" | "user";
  game?: T extends Game
    ? Omit<T, "description" | "image"> & {
        description?: string;
        image?: string;
      }
    : never;
  prize?: T extends Prize ? T : never;
  user?: T extends User ? T : never;
  onAvailabilityChange?: (id: number, isAvailable: boolean) => void;
  onEdit?: (item: T) => void;
  onUpdate?: (
    id: number,
    data: {
      name: string;
      description: string;
      image: string;
      price?: string;
      exchange_price?: string;
    },
  ) => void;
  onDelete?: (id: number) => void;
}

const AdminItemGrid = <T extends Game | Prize | User>({
  id,
  type,
  game,
  prize,
  user,
  onAvailabilityChange,
  onEdit,
  onDelete,
}: AdminItemGridProps<T>) => {
  const item = type === "game" ? game : type === "prize" ? prize : user;
  const [isAvailable, setIsAvailable] = useState(
    (item as Game | Prize)?.is_available ?? true,
  );
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
      onEdit(item as T);
    }
  };

  const handleAvailabilityChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newAvailability = !isAvailable;
    setIsAvailable(newAvailability);
    if (onAvailabilityChange) {
      onAvailabilityChange(id, newAvailability);
    }
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
          src={"image" in item ? item.image || logoWG : logoWG}
          alt={item.name}
        />
        <div className="adminCard-info">
          <h3 className="adminCard-name">{item.name}</h3>
        </div>
        <div className="adminCard-prices">
          {type === "game" ? (
            <div className="adminCard-prices-game">
              <span>{(item as Game).price}</span>
              <Coins size={16} />
            </div>
          ) : (
            <div className="adminCard-prices-prize">
              <span>{(item as Prize).exchange_price}</span>
              <Tickets size={16} />
            </div>
          )}
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
