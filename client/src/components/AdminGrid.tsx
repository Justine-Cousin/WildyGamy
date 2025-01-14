import type { Game } from "../services/types";
import "../styles/AdminGrid.css";

const AdminGrid = ({ game }: { game: Game }) => {
  return (
    <div className="adminCard-content">
      <img className="gamecard-image" src={game.image} alt={game.name} />
      <div className="adminCard-info">
        <h3 className="adminCard-name">{game.name}</h3>
      </div>
    </div>
  );
};

export default AdminGrid;
