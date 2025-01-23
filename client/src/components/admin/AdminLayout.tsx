import type React from "react";
import { useState } from "react";
import logoWG from "../../assets/images/logo_wildy_gamy.png";
import AddButton from "./AddButton";
import SliderBarAdmin from "./SliderBarAdmin";
import "../../styles/admin/AdminCommon.css";

interface AdminLayoutProps {
  children: React.ReactNode;
  onAddClick?: () => void;
  showAddButton?: boolean;
  containerClassName?: string;
  contentClassName?: string;
  logoClassName?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  onAddClick,
  showAddButton = true,
  containerClassName = "admingames-container",
  contentClassName = "admingames-content",
  logoClassName = "admingames-logo",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="admin-dashboard">
      <div className={containerClassName}>
        <img src={logoWG} alt="logo" className={logoClassName} />
        <SliderBarAdmin isOpen={isOpen} onToggle={setIsOpen} />

        <div className={`main-content ${isOpen ? "main-content-shifted" : ""}`}>
          <div className={contentClassName}>{children}</div>
        </div>

        {showAddButton && onAddClick && <AddButton onClick={onAddClick} />}
      </div>
    </div>
  );
};

export default AdminLayout;
