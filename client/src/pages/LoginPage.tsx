import { useSearchParams } from "react-router-dom";
import LoginPagePicture from "../assets/images/login-page-picture.jpg";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import CreateLogin from "../components/CreateLogin";
import LoginForm from "../components/LoginForm";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || undefined;

  return (
    <div className="loginpage-container">
      <img className="games-logo" src={logoWG} alt="Logo Wildy Gamy" />
      <div className="loginpage-left">
        <img
          className="background-image"
          src={LoginPagePicture}
          alt="Background"
        />
      </div>
      <div className="loginpage-right">
        <div className="loginpage-content">
          <LoginForm resetToken={token} />
          <CreateLogin />
        </div>
      </div>
    </div>
  );
}
