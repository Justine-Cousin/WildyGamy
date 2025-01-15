import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div>
      <main>
        <Outlet />
      </main>
      {!isAdminPage && (
        <header>
          <NavBar />
        </header>
      )}
    </div>
  );
}

export default App;
