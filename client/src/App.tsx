import { Link, Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/prizes">Récompenses</Link>
          <Link to="/games">Jeux</Link>
          <Link to="/login">Connexion</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
      <header>
        <NavBar />
      </header>
    </div>
  );
}

export default App;
