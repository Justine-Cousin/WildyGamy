import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./services/authContext";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
