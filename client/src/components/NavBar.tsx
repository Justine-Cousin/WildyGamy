import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/authContext";
import "../styles/NavBar.css";
import homeIcon from "../assets/images/home-icon.svg";
import loginIcon from "../assets/images/login-icon.svg";

export default function NavBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { auth } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="nav-bar-container">
      <div className="nav-bar-left">
        <Link className="nav-bar-link" to="/">
          <img className="home-icon" src={homeIcon} alt="" />
        </Link>
      </div>

      <div className="nav-bar-center">
        <button
          type="button"
          className={`burger-menu-button ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="burger-bar" />
          <span className="burger-bar" />
          <span className="burger-bar" />
        </button>
        <button
          type="button"
          className={`burger-menu-button-text ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          Menu
          <span className="burger-bar" />
          <span className="burger-bar" />
          <span className="burger-bar" />
        </button>
      </div>

      <div className="nav-bar-right">
        {auth?.user?.profile_pic ? (
          <Link className="nav-bar-link" to="/user_profile">
            <img
              className="nav-profile-pic"
              src={auth.user.profile_pic}
              alt="Profile"
            />
          </Link>
        ) : (
          <Link className="nav-bar-link" to="/login">
            <img className="login-icon" src={loginIcon} alt="" />
          </Link>
        )}
      </div>

      <div className={`burger-menu-dropdown ${isMenuOpen ? "active" : ""}`}>
        <Link className="burger-menu-link" to="/about_us" onClick={toggleMenu}>
          Qui sommes-nous ?
        </Link>
        <Link className="burger-menu-link" to="/play" onClick={toggleMenu}>
          Jeu en ligne
        </Link>
        <Link className="burger-menu-link" to="/ranking" onClick={toggleMenu}>
          Classement
        </Link>
        <Link className="burger-menu-link" to="/games" onClick={toggleMenu}>
          Liste des jeux
        </Link>
        <Link className="burger-menu-link" to="/prizes" onClick={toggleMenu}>
          Récompenses
        </Link>
      </div>
    </nav>
  );
}
