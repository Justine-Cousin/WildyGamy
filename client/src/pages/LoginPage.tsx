import logoWG from "../assets/images/logo_wildy_gamy.png";
import CreateLogin from "../components/CreateLogin";
import "../styles/LoginPage.css";

export default function LoginPage() {
  return (
    <div className="loginpage-container">
      <img className="games-logo" src={logoWG} alt="Logo" />
      <div className="loginpage-content">
        <CreateLogin />
      </div>
    </div>
  );
}
