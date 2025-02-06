import { useEffect, useState } from "react";
import "../styles/ResetPasswordModal.css";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  token?: string;
}

export default function ResetPasswordModal({
  isOpen,
  onClose,
  token: initialToken,
}: ResetPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<"request" | "reset">("request");
  const [token, setToken] = useState(initialToken);

  useEffect(() => {
    if (initialToken) {
      verifyToken(initialToken);
    }
  }, [initialToken]);

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reset-password/verify?token=${tokenToVerify}`,
      );
      const data = await response.json();

      if (data.valid) {
        setStep("reset");
        setToken(tokenToVerify);
      } else {
        setError("Le lien de réinitialisation est invalide ou a expiré");
      }
    } catch (err) {
      setError("Erreur lors de la vérification du lien de réinitialisation");
    }
  };

  const handleRequestReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reset-password/request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Un lien vous a été envoyé pour réinitialiser votre mot de passe.",
        );
        setTimeout(() => onClose(), 3000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/reset-password/reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Votre mot de passe a été mis à jour avec succès");
        setTimeout(() => {
          onClose();
          window.location.href = "/login";
        }, 2000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setMessage("");
    setStep("request");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button type="button" className="modal-close" onClick={handleClose}>
          ×
        </button>

        <div className="modal-header">
          <h2 className="modal-title">
            {step === "request"
              ? "REPRENEZ VOS ESPRITS"
              : "Nouveau mot de passe"}
          </h2>
          <p className="modal-description">
            {step === "request"
              ? "Entrez votre email pour recevoir les instructions"
              : "Entrez votre nouveau mot de passe"}
          </p>
        </div>

        {message ? (
          <div>
            <p className="success-message">{message}</p>
          </div>
        ) : step === "request" ? (
          <form onSubmit={handleRequestReset} className="reset-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jeanotlefou@email.com"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="button-group">
              <button
                type="button"
                className="button button-secondary"
                onClick={handleClose}
                disabled={isLoading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="button button-primary"
                disabled={isLoading || !email}
              >
                {isLoading ? "Envoi en cours..." : "Envoyer"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="reset-form">
            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">
                Nouveau mot de passe
              </label>
              <input
                id="newPassword"
                type="password"
                className="form-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 caractères"
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmer le mot de passe"
                required
                minLength={6}
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="button-group">
              <button
                type="button"
                className="button button-secondary"
                onClick={handleClose}
                disabled={isLoading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="button button-primary"
                disabled={isLoading || !newPassword || !confirmPassword}
              >
                {isLoading ? "Mise à jour..." : "Valider"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
