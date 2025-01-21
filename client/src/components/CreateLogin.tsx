import type React from "react";
import { useEffect, useState } from "react";
import bin from "../assets/images/bin.svg";
import BlurredBackground from "./BlurredBackground";
import "../styles/CreateLogin.css";

interface FormData {
  name: string;
  firstname: string;
  phone_number: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { files: FileList };
}

interface ApiError {
  error?: string;
  details?: string;
}

export default function CreateLogin() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    firstname: "",
    phone_number: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleFileChange = (e: FileChangeEvent) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("La taille de l'image ne doit pas dépasser 5MB");
        e.target.value = "";
        return;
      }

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setError("Veuillez sélectionner une image valide (JPG, JPEG ou PNG)");
        e.target.value = "";
        return;
      }

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      setProfilePic(file);
      setError("");
    }
  };

  const clearProfilePic = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setProfilePic(null);
    setPreviewUrl(null);
    const fileInput = document.getElementById(
      "profile_pic",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (
        !formData.name.trim() ||
        !formData.firstname.trim() ||
        !formData.email.trim() ||
        !formData.username.trim() ||
        !formData.password ||
        !formData.confirm_password ||
        !profilePic
      ) {
        setError("Veuillez remplir tous les champs obligatoires");
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirm_password) {
        setError("Les mots de passe ne correspondent pas");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Le mot de passe doit contenir au moins 6 caractères");
        setIsLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Format d'email invalide");
        setIsLoading(false);
        return;
      }

      const submitData = new FormData();
      for (const key of Object.keys(formData) as Array<keyof FormData>) {
        if (key !== "confirm_password") {
          submitData.append(key, formData[key]);
        }
      }

      if (profilePic) {
        submitData.append("profile_pic", profilePic);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "POST",
        credentials: "include",
        body: submitData,
      });

      const data = (await response.json()) as ApiError;

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.details ||
            "Une erreur est survenue lors de la création du compte",
        );
      }

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
    } finally {
      setIsLoading(false);
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

        <form
          className="login-form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Formulaire de création de compte"
        >
          <div className="login-text">
            <label className="login-label" htmlFor="name">
              Nom{" "}
              <span className="login-asterisk" aria-hidden="true">
                *
              </span>
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
                aria-required="true"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="firstname">
              Prénom{" "}
              <span className="login-asterisk" aria-hidden="true">
                *
              </span>
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
                aria-required="true"
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="email">
              Adresse e-mail{" "}
              <span className="login-asterisk" aria-hidden="true">
                *
              </span>
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ex: jean.lassalle@example.fr"
                required
                aria-required="true"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="username">
              Pseudo{" "}
              <span className="login-asterisk" aria-hidden="true">
                *
              </span>
            </label>
            <div className="input-wrapper">
              <input
                className="login-input"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="ex: jlassalle"
                required
                aria-required="true"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="login-picture-container">
            <label className="login-text-picture" htmlFor="profile_pic">
              Photo de profil{" "}
              <span className="login-asterisk" aria-hidden="true">
                *
              </span>
            </label>
            <div className="login-picture-wrapper">
              <div className="login-picture-input">
                <input
                  className="login-input"
                  type="file"
                  id="profile_pic"
                  name="profile_pic"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  required
                  aria-required="true"
                  aria-label="Sélectionner une photo de profil"
                  disabled={isLoading}
                />
              </div>
              {previewUrl && (
                <div className="preview-container">
                  <img
                    src={previewUrl}
                    alt="Prévisualisation du profil"
                    className="profile-preview"
                  />
                  <button
                    type="button"
                    className="login-bin-button"
                    onClick={clearProfilePic}
                    aria-label="Supprimer la photo de profil"
                  >
                    ×
                  </button>
                </div>
              )}
              <img
                src={bin}
                alt="icône supprimer"
                className="login-bin"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="password">
              Mot de passe{" "}
              <span className="login-asterisk" aria-hidden="true">
                *
              </span>
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
                aria-required="true"
                minLength={6}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="login-text">
            <label className="login-label" htmlFor="confirm_password">
              Confirmer le mot de passe{" "}
              <span className="login-asterisk" aria-hidden="true">
                *
              </span>
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
                aria-required="true"
                minLength={6}
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            className="login-submit-button"
            type="submit"
            disabled={isLoading || success}
            aria-disabled={isLoading || success}
          >
            {isLoading ? "Création en cours..." : "Créer mon compte"}
          </button>
        </form>
      </BlurredBackground>
    </div>
  );
}
