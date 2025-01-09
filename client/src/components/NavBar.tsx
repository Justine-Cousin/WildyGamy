import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import homeIcon from "../assets/images/home-icon.svg";
import loginIcon from "../assets/images/login-icon.svg";

export default function NavBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
        <Link className="nav-bar-link" to="/login">
          <img className="login-icon" src={loginIcon} alt="" />
        </Link>
      </div>

      {isMenuOpen && (
        <div className="burger-menu-dropdown">
          <Link className="burger-menu-link" to="/prizes" onClick={toggleMenu}>
            Récompenses
          </Link>
          <Link className="burger-menu-link" to="/games" onClick={toggleMenu}>
            Jeux
          </Link>
        </div>
      )}
    </nav>
  );
}
