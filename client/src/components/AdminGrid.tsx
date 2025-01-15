import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import type React from "react";
import "../styles/AdminGrid.css";

type AdminGridProps = {
  type: string;
  game?: { image: string; name: string };
  price?: { image: string; name: string };
};

const AdminGrid: React.FC<AdminGridProps> = ({ type, game, price }) => {
  const [isavailable, setIsAvailable] = useState(true);
  const handleAvailability = () => {
    setIsAvailable((prev) => !prev);
  };
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
                onClick={handleAvailability}
                className="admincard-button"
              >
                {isavailable ? (
                  <Eye className="admingrid-eye" />
                ) : (
                  <EyeClosed className="admingrid-eye" />
                )}
              </button>
              <div>
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
