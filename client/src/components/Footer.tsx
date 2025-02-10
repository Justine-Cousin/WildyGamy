import { Facebook, Instagram, MessagesSquare } from "lucide-react";
import { useState } from "react";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import LegalNoticeModal from "./LegalNoticeModal";
import "../styles/Footer.css";

export default function Footer() {
  const [isLegalNoticeVisible, setLegalNoticeVisible] = useState(false);

  const handleLegalNotice = () => {
    setLegalNoticeVisible(true);
  };

  const handleCloseLegalNotice = () => {
    setLegalNoticeVisible(false);
  };

  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-info">
          <img src={logoWG} className="footer-logo" alt="Wildy Gamy" />
          <div className="footer-contact">
            <p>8 Rue de Valenciennes, 31000 Toulouse</p>
            <p>
              05 55 55 55 55
              <br />
              wildygamy.tlse@gmail.com
            </p>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-social-links">
            <Facebook size={30} fill="#c3b0ea" color={"transparent"} />
            <Instagram size={30} />
            <MessagesSquare size={30} fill="#c3b0ea" color={"transparent"} />
          </div>
          <div className="footer-legal">
            <p
              className="footer-legal-notice"
              onClick={handleLegalNotice}
              onKeyUp={(e) => e.key === "Enter" && handleLegalNotice()}
              style={{ cursor: "pointer" }}
            >
              Mentions légales
            </p>
            <p>Politique de confidentialité</p>
            <p>© 2025 Wildy Gamy</p>
          </div>
        </div>
      </div>
      <LegalNoticeModal
        visible={isLegalNoticeVisible}
        onClose={handleCloseLegalNotice}
      />
    </div>
  );
}
