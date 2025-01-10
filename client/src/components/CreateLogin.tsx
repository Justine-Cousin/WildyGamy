import { useState } from "react";
import type { FormEvent } from "react";
import BlurredBackground from "./BlurredBackground";
import "../styles/CreateLogin.css";

interface FormData {
  name: string;
  firstname: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
  phone_number: string;
  profile_pic: File | null;
}

export default function CreateLogin() {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    firstname: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    profile_pic: null,
  });

  const handleImageUpload = async (file: File) => {
    try {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "user_profile_pics");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: imageData,
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'upload de l'image");
      }

      const data = await response.json();

      return data.secure_url;
    } catch (err) {
      console.error("Erreur lors de l'upload de l'image:", err);
      setError("Erreur lors de l'upload de l'image");
      return null;
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (files && name === "profile_pic") {
      setFormData((prev) => ({
        ...prev,
        profile_pic: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirm_password) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    try {
      let profilePicUrl = null;
      if (formData.profile_pic) {
        profilePicUrl = await handleImageUpload(formData.profile_pic);
      }

      const userData = {
        name: formData.name,
        firstname: formData.firstname,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        phone_number: formData.phone_number || null,
        profilePicture: profilePicUrl,
      };

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let errorMessage = "Erreur lors de la création du compte";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error("Erreur lors du parsing de la réponse d'erreur:", e);
        }
        throw new Error(errorMessage);
      }

      if (responseText) {
        try {
          //const data = JSON.parse(responseText);

          setSuccess(true);
          // Redirection après un court délai
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } catch (e) {
          console.error("Erreur lors du parsing de la réponse:", e);
          throw new Error("Format de réponse invalide");
        }
      }
    } catch (err) {
      console.error("Erreur complète:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  };

  return (
    <div className="login-form-container">
      <BlurredBackground>
        <h1 className="login-form-title">CRÉER VOTRE COMPTE</h1>
        {error && (
          <div
            className="error-message"
            style={{
              color: "red",
              padding: "10px",
              marginBottom: "20px",
              backgroundColor: "rgba(255,0,0,0.1)",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            className="success-message"
            style={{
              color: "green",
              padding: "10px",
              marginBottom: "20px",
              backgroundColor: "rgba(0,255,0,0.1)",
              borderRadius: "4px",
            }}
          >
            Compte créé avec succès ! Redirection en cours...
          </div>
        )}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-text">
            <label className="login-label" htmlFor="name">
              Nom
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="text"
                id="name"
                name="name"
                placeholder="ex: Lassalle"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="firstname">
              Prénom
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="text"
                id="firstname"
                name="firstname"
                placeholder="ex: Jean"
                value={formData.firstname}
                onChange={handleInputChange}
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
                placeholder="ex: 06 12 34 56 78"
                value={formData.phone_number}
                onChange={handleInputChange}
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
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="username">
              Pseudo
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="text"
                id="username"
                name="username"
                placeholder="ex: lebergerdesPyrénées"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="profile_pic">
              Photo de profil
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="file"
                id="profile_pic"
                name="profile_pic"
                accept="image/*"
                onChange={handleInputChange}
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
                placeholder="Minimum 6 caractères"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
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
                placeholder="Confirmez votre mot de passe"
                value={formData.confirm_password}
                onChange={handleInputChange}
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
