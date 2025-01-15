import BlurredBackground from "./BlurredBackground";
import "../styles/LoginForm.css";

export default function LoginForm() {
  return (
    <div className="login-container">
      <BlurredBackground>
        <h1 className="login__title">SE CONNECTER</h1>
        <form className="login__form">
          <div className="login__field">
            <label className="login__label" htmlFor="email">
              Adresse email <span className="login__required">*</span>
            </label>
            <div className="login__input-wrapper">
              <input
                className="login__input"
                type="email"
                id="email"
                name="email"
                placeholder="ex : lorem.ipsum@gmail.com"
                required
              />
            </div>
          </div>

          <div className="login__field">
            <label className="login__label" htmlFor="password">
              Votre mot de passe <span className="login__required">*</span>
            </label>
            <div className="login__input-wrapper">
              <input
                className="login__input"
                type="password"
                id="password"
                name="password"
                placeholder="xxxxxxx"
                required
              />
            </div>
          </div>

          <div className="login__remember">
            <label className="login__remember-label">
              <input
                type="checkbox"
                className="login__remember-input"
                id="stay_connected"
                name="stay_connected"
              />
              Rester connecté
            </label>
          </div>

          <button className="login__submit" type="submit">
            Se connecter
          </button>

          <div className="login__links">
            <a href="/forgot-password" className="login__forgot-link">
              Mot de passe oublié ?
            </a>
          </div>
        </form>
      </BlurredBackground>
      <div className="login__signup-container">
        <hr className="login__signup-line" />
        <span className="login__signup">
          Ou{" "}
          <a href="/create-account" className="login__signup-link">
            créer votre compte
          </a>
        </span>
        <hr className="login__signup-line" />
      </div>
    </div>
  );
}
