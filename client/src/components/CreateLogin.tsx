import type React from "react";
import { useState } from "react";
import bin from "../assets/images/bin.svg";
import BlurredBackground from "./BlurredBackground";
import "../styles/CreateLogin.css";

export default function CreateLogin() {
  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    phone_number: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList };
  }

  const handleFileChange = (e: FileChangeEvent) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("La taille de l'image ne doit pas dépasser 5MB");
        e.target.value = "";
        return;
      }
      setProfilePic(file);
      setError("");
    }
  };

  const clearProfilePic = () => {
    setProfilePic(null);
    const fileInput = document.getElementById("profile_pic");
    if (fileInput) (fileInput as HTMLInputElement).value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.firstname.trim() ||
      !formData.email.trim() ||
      !formData.username.trim() ||
      !formData.password ||
      !formData.confirm_password
    ) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Format d'email invalide");
      return;
    }

    const submitData = new FormData();
    for (const key of Object.keys(formData) as (keyof typeof formData)[]) {
      if (key !== "confirm_password") {
        submitData.append(key, formData[key]);
      }
    }
    if (profilePic) {
      submitData.append("profile_pic", profilePic);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
        body: submitData,
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(
            errorData.error ||
              "Une erreur est survenue lors de la création du compte",
          );
        }
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      await response.json();
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      console.error("Erreur détaillée:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }
    }
  };

  return (
    <div className="login-form-container">
      <BlurredBackground>
        <h1 className="login-form-title">CRÉER VOTRE COMPTE</h1>

        {error && (
          <div className="error-message" aria-live="assertive">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message" aria-live="polite">
            Compte créé avec succès ! Redirection vers la page de connexion...
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
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
                value={formData.name}
                onChange={handleInputChange}
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
                value={formData.firstname}
                onChange={handleInputChange}
                placeholder="ex: Jean"
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="phone_number">
              Numéro de téléphone
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
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
                className="login-input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ex: jean.lassalle@lebergerdesespyrenees.fr"
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
                value={formData.username}
                onChange={handleInputChange}
                placeholder="ex: lebergerdesPyrénées"
                required
              />
            </div>
          </div>

          <div className="login-picture-container">
            <label className="login-text-picture" htmlFor="profile_pic">
              Photo de profil <span className="login-asterisk">*</span>
            </label>
            <div className="login-picture-wrapper">
              <div className="login-picture-input">
                <input
                  className="login-input"
                  type="file"
                  id="profile_pic"
                  name="profile_pic"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>
              {profilePic && (
                <button
                  type="button"
                  className="login-bin-button"
                  onClick={clearProfilePic}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      clearProfilePic();
                    }
                  }}
                />
              )}
              <img src={bin} alt="supprimer" className="login-bin" />
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
                value={formData.password}
                onChange={handleInputChange}
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
                value={formData.confirm_password}
                onChange={handleInputChange}
                placeholder="Confirmez votre mot de passe"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            className="login-submit-button"
            type="submit"
            disabled={success}
          >
            Créer mon compte
          </button>
        </form>
      </BlurredBackground>
    </div>
  );
}
