import "../styles/CreateLogin.css";
import BlurredBackground from "./BlurredBackground";

export default function CreateLogin() {
  return (
    <div className="login-form-container">
      <BlurredBackground>
        <h1 className="login-form-title">CRÉER VOTRE COMPTE</h1>
        <form className="login-form">
          <div className="login-text">
            <label className="login-label" htmlFor="Nom">
              Nom
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="text"
                id="Nom"
                name="Nom"
                placeholder="ex: Lassalle"
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="Prénom">
              Prénom
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="text"
                id="Prénom"
                name="Prénom"
                placeholder="ex: Jean"
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="Date_de_naissance">
              Date de naissance
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="date"
                id="Date_de_naissance"
                name="Date_de_naissance"
                placeholder="jj/mm/aaaa"
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="téléphone">
              Numéro de téléphone
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="tel"
                id="téléphone"
                name="téléphone"
                placeholder="ex: 06 12 34 56 78"
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="email">
              Adresse e-mail
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="email"
                id="email"
                name="email"
                placeholder="ex: jeanlassalle@gmail.com"
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="pseudo">
              Pseudo
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="text"
                id="pseudo"
                name="pseudo"
                placeholder="ex: lebergerdesPyrénées"
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="password">
              Mot de passe
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="password"
                id="password"
                name="password"
                placeholder="ex: XXXXXXXX"
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="confirm_password">
              Confirmer le mot de passe
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="ex: XXXXXXX"
                required
              />
            </div>
          </div>

          <button className="login-submit-button" type="submit">
            Se connecter
          </button>
        </form>
      </BlurredBackground>
    </div>
  );
}
