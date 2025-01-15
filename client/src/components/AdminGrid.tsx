import { Eye, EyeClosed, PencilLine } from "lucide-react";
import { useState } from "react";
import type React from "react";
import "../styles/AdminGrid.css";

type AdminGridProps = {
  type: string;
  id: number;
  game?: { id: number; image: string; name: string; is_available: boolean };
  price?: { image: string; name: string };
  onAvailabilityChange: (id: number, isAvailable: boolean) => void;
};

const AdminGrid: React.FC<AdminGridProps> = ({
  type,
  game,
  price,
  onAvailabilityChange,
}) => {
  const [isavailable, setIsAvailable] = useState(game?.is_available ?? true);

  switch (type) {
    case "game":
      return (
        <div
          className={`admincard-content ${isavailable ? "admincard-content-available" : "admincard-content-unavailable"}`}
        >
          {game && (
            <div className="admincard-availability">
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
                <button type="button" className="admincard-button edit-button">
                  <PencilLine className="admingrid-pencil" />
                </button>
              </button>
              <div className="adminCard-info-container">
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
