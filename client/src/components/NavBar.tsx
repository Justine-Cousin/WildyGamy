import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/authContext";
import "../styles/NavBar.css";
import Games from "../assets/images/Games.svg";
import Play from "../assets/images/Play.svg";
import Prizes from "../assets/images/Prizes.svg";
import Room from "../assets/images/Room.svg";
import homeIcon from "../assets/images/home-icon.svg";
import loginIcon from "../assets/images/login-icon.svg";

const menuItems = [
  { id: 1, to: "/", text: "Accueil", icon: { homeIcon } },
  { id: 2, to: "/about_us", text: "Qui sommes-nous ?", icon: { Room } },
  { id: 3, to: "/play", text: "Jeu en ligne", icon: { Play } },
  { id: 4, to: "/ranking", text: "Classement", icon: { Room } },
  { id: 5, to: "/games", text: "Liste des jeux", icon: { Games } },
  { id: 6, to: "/prizes", text: "Récompenses", icon: { Prizes } },
  { id: 7, to: "/login", text: "Se connecter", icon: { loginIcon } },
];

export default function NavBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { auth } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      {/* Version Mobile */}
      <nav className="mobile-nav">
        <div className="nav-bar-left">
          <Link className="nav-bar-link" to="/">
            <img className="home-icon" src={homeIcon} alt="Home" />
          </Link>
        </div>

        <div className="nav-bar-center">
          <button
            ref={buttonRef}
            type="button"
            className={`burger-menu-button ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
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
              <img className="login-icon" src={loginIcon} alt="Login" />
            </Link>
          )}
        </div>

        <div
          ref={menuRef}
          className={`burger-menu-dropdown ${isMenuOpen ? "active" : ""}`}
        >
          <Link
            className="burger-menu-link"
            to="/about_us"
            onClick={toggleMenu}
          >
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

      {/* Version Desktop  */}
      <nav className="desktop-nav">
        <div className="desktop-nav-container">
          {menuItems.map((item) => (
            <Link key={item.id} className="desktop-nav-link" to={item.to}>
              <img
                className="desktop-nav-icon"
                src={Object.values(item.icon)[0]}
                alt={item.text}
              />
              <span id="desktop-nav-text">{item.text}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
