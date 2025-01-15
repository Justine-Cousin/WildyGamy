import "../../styles/AdminHome.css";
import { useState } from "react";
import Users from "../../assets/images/Users.svg";
import game from "../../assets/images/game.svg";
import logoWG from "../../assets/images/logo_wildy_gamy.png";
import price from "../../assets/images/price.svg";
import SliderBarAdmin from "../../components/SliderBarAdmin";

function AdminHome() {
  const [isOpen, setIsOpen] = useState(false);
  const handleSidebarToggle = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className="adminhome-container">
      <img src={logoWG} alt="logo" className="adminhome-logo" />
      <SliderBarAdmin isOpen={isOpen} onToggle={handleSidebarToggle} />
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
