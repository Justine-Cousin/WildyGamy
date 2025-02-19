import { Navigate, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { AuthProvider, useAuth } from "./services/authContext";

function AppContent() {
  const location = useLocation();
  const { user } = useAuth();
  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) {
    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!user.is_admin) {
      return <Navigate to="/" replace />;
    }
  }

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
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
