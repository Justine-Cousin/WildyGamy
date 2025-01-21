import {
  CircleUser,
  Coins,
  Eye,
  EyeClosed,
  PencilLine,
  Phone,
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
          className={
            type === "game"
              ? "gamecard-image"
              : type === "prize"
                ? "pricecard-img"
                : "profile_pic"
          }
          src={
            type === "user"
              ? (item as User).profile_pic || logoWG
              : "image" in item
                ? item.image || logoWG
                : logoWG
          }
          alt={item.name}
        />
        <div className="adminCard-info">
          <h3 className="adminCard-name">
            {(item as User).firstname} {item.name}
          </h3>
          {type === "user" && (
            <div className="adminCard-user-info">
              <div className="adminCard-username">
                <CircleUser className="username-icone" size={15} />
                <span> {(item as User).username}</span>
              </div>

              <div className="adminCard-phone">
                <Phone className="phone-icone" size={15} />
                <span> {(item as User).phone_number || "Non renseigné"}</span>
              </div>
            </div>
          )}
        </div>
        <div className="adminCard-prices">
          {type === "game" ? (
            <div className="adminCard-prices-game">
              <span>{(item as Game).price}</span>
              <Coins size={16} />
            </div>
          ) : type === "prize" ? (
            <div className="adminCard-prices-prize">
              <span>{(item as Prize).exchange_price}</span>
              <Tickets size={16} />
            </div>
          ) : null}
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
