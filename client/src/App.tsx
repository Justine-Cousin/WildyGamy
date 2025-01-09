import { Link, Outlet } from "react-router-dom";
import "./App.css";
import logo from "./assets/images/logo_wildy_gamy.png";
import Room from "./pages/Room";

function App() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Accueil</Link>
          <Link to="/prizes">Récompenses</Link>
          <Link to="/games">Jeux</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
