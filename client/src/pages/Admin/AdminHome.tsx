import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Users from "../assets/images/Users.svg";
import game from "../assets/images/game.svg";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import logout from "../assets/images/logout.svg";
import price from "../assets/images/price.svg";
import "../styles/AdminHome.css";

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
    link: "/admin/Games",
  },
  {
    id: 3,
    title: "Lots",
    icon: <img src={price} alt="price" />,
    link: "/admin/price",
  },
];

function AdminHome() {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    // Implement logout functionality here
    alert("logout");
  };
  return (
    <div className="adminhome-container">
      <img src={logoWG} alt="logo" className="adminhome-logo" />
      <div
        className={`adminhome-sidebar ${isOpen ? "adminhome-sidebar-open" : "adminhome-sidebar-close"}`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
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

      <div className={`main-content ${isOpen ? "main-content-shifted" : ""}`}>
        <div className="welcome-container">
          <h1 className="welcome-title">
            BIENVENUE DANS L'ESPACE ADMINISTRATEUR
          </h1>

          <div className="welcome-content">
            <div className="features-list">
              <div className="feature-item">
                <img src={Users} alt="Users" className="feature-icon" />
                <h2>Utilisateurs</h2>
                <p>Gérez les comptes utilisateurs :</p>
                <ul>
                  <li>Ajout de nouveaux utilisateurs</li>
                  <li>Modification des comptes existants</li>
                  <li>Suppression des comptes</li>
                </ul>
              </div>

              <div className="feature-item">
                <img src={game} alt="Games" className="feature-icon" />
                <h2>Jeux</h2>
                <p>Administration des jeux :</p>
                <ul>
                  <li>Création de nouveaux jeux</li>
                  <li>Mise à jour des jeux existants</li>
                  <li>Suppression des jeux</li>
                </ul>
              </div>

              <div className="feature-item">
                <img src={price} alt="Prices" className="feature-icon" />
                <h2>Lots</h2>
                <p>Gestion des lots à gagner :</p>
                <ul>
                  <li>Ajout de nouveaux lots</li>
                  <li>Modification des lots existants</li>
                  <li>Retrait des lots</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
