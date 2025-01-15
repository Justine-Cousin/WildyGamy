import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import Users from "../assets/images/Users.svg";
import game from "../assets/images/game.svg";
import logout from "../assets/images/logout.svg";
import price from "../assets/images/price.svg";
import "../styles/SliderBarAdmin.css";

interface SliderBarAdminProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

const menuItems = [
  {
    id: 1,
    title: "Utilisateurs",
    icon: <img src={Users} alt="Users" />,
    link: "/admin/users",
  },
  {
    id: 2,
    title: "Jeux",
    icon: <img src={game} alt="game" />,
    link: "/admin/games",
  },
  {
    id: 3,
    title: "Lots",
    icon: <img src={price} alt="price" />,
    link: "/admin/price",
  },
];

function SliderBarAdmin({ isOpen, onToggle }: SliderBarAdminProps) {
  const handleLogout = () => {
    // Implement logout functionality here
    alert("logout");
  };

  return (
    <div
      className={`adminhome-sidebar ${isOpen ? "adminhome-sidebar-open" : "adminhome-sidebar-close"}`}
    >
      <button
        type="button"
        onClick={() => onToggle(!isOpen)}
        className="adminhome-button"
      >
        {isOpen ? (
          <X className="button-close" />
        ) : (
          <Menu className="button-open" />
        )}
      </button>

      <div className="adminhome-menu">
        {menuItems.map((item) => (
          <Link key={item.id} to={item.link} className="menu-item">
            {item.icon}
            <span
              className={`menu-item-text ${!isOpen && "menu-item-text-hidden"}`}
            >
              {item.title}
            </span>
          </Link>
        ))}
      </div>
      <button type="button" onClick={handleLogout} className="logout-button">
        <img src={logout} alt="Déconnexion" />
        <span
          className={`menu-item-text ${!isOpen && "menu-item-text-hidden"}`}
        >
          Déconnexion
        </span>
      </button>
    </div>
  );
}

export default SliderBarAdmin;
