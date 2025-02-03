import { Joystick, LogOut, Menu, Trophy, Users, View, X } from "lucide-react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/authContext";
import "../../styles/admin/SliderBarAdmin.css";
import AlertModalAdmin from "../AlertModal";

interface SliderBarAdminProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  onClose: () => void;
}

const menuItems = [
  {
    id: 1,
    title: "Utilisateurs",
    icon: <Users className="iconItem" />,
    link: "/admin/users",
  },
  {
    id: 2,
    title: "Jeux",
    icon: <Joystick className="iconItem" />,
    link: "/admin/games",
  },
  {
    id: 3,
    title: "Lots",
    icon: <Trophy className="iconItem" />,
    link: "/admin/prizes",
  },
];

function SliderBarAdmin({ isOpen, onToggle, onClose }: SliderBarAdminProps) {
  const navigate = useNavigate();
  const { setAuth } = useAuth() as unknown as {
    setAuth: (auth: null) => void;
  };
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const logoutUser = () => {
    setAuth(null);
    onClose();
    navigate("/");
  };

  const handleLogout = () => {
    setModalConfig({
      title: "Déconnexion",
      message: "Êtes-vous sûr de vouloir vous déconnecter ?",
      onConfirm: logoutUser,
    });
  };

  const handleClick = () => {
    window.open("/", "_blank", "noopener,noreferrer");
  };
  const renderModal = () => {
    return ReactDOM.createPortal(
      <AlertModalAdmin
        title={modalConfig?.title || ""}
        message={modalConfig?.message || ""}
        visible={modalConfig !== null}
        onConfirm={modalConfig?.onConfirm || (() => {})}
        onClose={() => setModalConfig(null)}
      />,
      document.body,
    );
  };
  return (
    <div
      className={`adminhome-sidebar ${isOpen ? "adminhome-sidebar-open" : "adminhome-sidebar-close"}`}
    >
      <button
        type="button"
        onClick={() => onToggle(!isOpen)}
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
      <button type="button" className="vueUser-button" onClick={handleClick}>
        <View className="iconItem" />
        <span className="menu-item-text">Vue visiteur</span>
      </button>

      <button type="button" onClick={handleLogout} className="logout-button">
        <LogOut className="iconItem" />
        <span
          className={`menu-item-text ${!isOpen && "menu-item-text-hidden"}`}
        >
          Déconnexion
        </span>
      </button>
      {modalConfig !== null && renderModal()}
    </div>
  );
}

export default SliderBarAdmin;
