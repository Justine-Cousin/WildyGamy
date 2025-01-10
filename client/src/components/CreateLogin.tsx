import BlurredBackground from "./BlurredBackground";
import "../styles/CreateLogin.css";
import bin from "../assets/images/bin.svg";

export default function CreateLogin() {
  return (
    <div className="login-form-container">
      <BlurredBackground>
        <h1 className="login-form-title">CRÉER VOTRE COMPTE</h1>
        <form className="login-form">
          <div className="login-text">
            <label className="login-label" htmlFor="name">
              Nom <span className="login-asterisk">*</span>
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="text"
                id="name"
                name="name"
                placeholder="ex: Lassalle"
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="firstname">
              Prénom <span className="login-asterisk">*</span>
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="text"
                id="firstname"
                name="firstname"
                placeholder="ex: Jean"
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="phone_number">
              Numéro de téléphone <span className="login-asterisk">*</span>
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="tel"
                id="phone_number"
                name="phone_number"
                placeholder="ex: 06 12 34 56 78"
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="email">
              Adresse e-mail <span className="login-asterisk">*</span>
            </label>
            <div className="input-wrapper">
              <input
                placeholder="ex: jean.lassalle@lebergerdesespyrenees.fr"
                className="login-input"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="username">
              Pseudo <span className="login-asterisk">*</span>
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="text"
                id="username"
                name="username"
                placeholder="ex: lebergerdesPyrénées"
                required
              />
            </div>
          </div>

          <div className="login-picture-container">
            <label className="login-text-picture" htmlFor="profile_pic">
              Photo de profil <span className="login-asterisk"> *</span>
            </label>
            <div className="login-picture-wrapper">
              <div className="login-picture-input">
                <input
                  className="login-input"
                  type="file"
                  id="profile_pic"
                  name="profile_pic"
                  accept="image/*"
                />
              </div>
              <img src={bin} alt="poubelle supprimer" className="login-bin" />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="password">
              Mot de passe <span className="login-asterisk">*</span>
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="password"
                id="password"
                name="password"
                placeholder="Minimum 6 caractères"
                required
                minLength={6}
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="confirm_password">
              Confirmer le mot de passe{" "}
              <span className="login-asterisk">*</span>
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirmez votre mot de passe"
                required
                minLength={6}
              />
            </div>
          </div>

          <button className="login-submit-button" type="submit">
            Créer mon compte
          </button>
        </form>
      </BlurredBackground>
    </div>
  );
}
