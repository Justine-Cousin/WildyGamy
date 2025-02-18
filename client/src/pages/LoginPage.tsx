import { useSearchParams } from "react-router-dom";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import CreateLogin from "../components/CreateLogin";
import LoginForm from "../components/LoginForm";
import "../styles/LoginPage.css";
import LoginBackground from "../assets/images/login-page-picture.jpg";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || undefined;

  return (
    <div className="loginpage-container">
      <div>
        {" "}
        <img className="games-logo" src={logoWG} alt="Logo Wildy Gamy" />
      </div>
      <div className="loginpage-left">
        <img
          className="background-image"
          src={LoginBackground}
          alt="Background"
        />
      </div>
      <div className="loginpage-right">
        <div className="loginpage-content">
          <LoginForm resetToken={token} />
        </div>
        <div className="register">
          <CreateLogin />
        </div>
      </div>
    </div>
  );
}
