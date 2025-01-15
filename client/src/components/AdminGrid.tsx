import type React from "react";
import "../styles/AdminGrid.css";

type AdminGridProps = {
  type: string;
  game?: { image: string; name: string };
  price?: { image: string; name: string };
};

const AdminGrid: React.FC<AdminGridProps> = ({ type, game, price }) => {
  switch (type) {
    case "game":
      return (
        <div className="adminCard-content">
          {game && (
            <>
              <img
                className="gamecard-image"
                src={game.image}
                alt={game.name}
              />
              <div className="adminCard-info">
                <h3 className="adminCard-name">{game.name}</h3>
              </div>
            </>
          )}
        </div>
      );

    case "price":
      return (
        <div className="adminCard-content">
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
