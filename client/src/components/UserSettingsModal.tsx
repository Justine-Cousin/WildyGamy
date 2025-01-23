import "../styles/UserSettingsModal.css";
import { KeyRound, LogOut, Pencil, Save, UserX, X } from "lucide-react";
import { useState } from "react";

interface User {
  name: string;
  firstname: string;
  email: string;
  username: string;
  phone_number: string;
}

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export default function UserSettingsModal({
  isOpen,
  onClose,
  user,
}: UserSettingsModalProps) {
  const [editModes, setEditModes] = useState({
    name: false,
    firstname: false,
    email: false,
    username: false,
    phone_number: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    email: "",
    username: "",
    phone_number: "",
  });

  const toggleEdit = (field: keyof typeof editModes) => {
    setEditModes((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    setFormData((prev) => ({
      ...prev,
      [field]: user?.[field] || "",
    }));
  };

  if (!isOpen || !user) return null;

  return (
    <div className="user-modal-overlay">
      <div className="user-modal-content">
        <button type="button" className="user-modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="user-modal-title">Paramètres du profil</h2>
        <h3>Mes Informations Personnelles</h3>
        <div className="user-modal-info-container">
          <div className="user-modal-info-item">
            <label className="user-modal-info-label" htmlFor="name">
              Nom
            </label>
            <div className="user-modal-info-value">
              {editModes.name ? (
                <>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <Save
                    size={16}
                    className="save-icon"
                    onClick={() => toggleEdit("name")}
                  />
                  <X
                    size={16}
                    className="cancel-icon"
                    onClick={() => toggleEdit("name")}
                  />
                </>
              ) : (
                <>
                  <p>{user.name}</p>
                  <Pencil
                    size={16}
                    className="edit-icon"
                    onClick={() => toggleEdit("name")}
                  />
                </>
              )}
            </div>
          </div>
          <span className="user-modal-separator"> </span>
          <div className="user-modal-info-item">
            <label className="user-modal-info-label" htmlFor="firstname">
              Prénom
            </label>
            <div className="user-modal-info-value">
              {editModes.firstname ? (
                <>
                  <input
                    type="text"
                    id="firstname"
                    value={formData.firstname}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstname: e.target.value,
                      }))
                    }
                  />
                  <Save
                    size={16}
                    className="save-icon"
                    onClick={() => toggleEdit("firstname")}
                  />
                  <X
                    size={16}
                    className="cancel-icon"
                    onClick={() => toggleEdit("firstname")}
                  />
                </>
              ) : (
                <>
                  <p>{user.firstname}</p>
                  <Pencil
                    size={16}
                    className="edit-icon"
                    onClick={() => toggleEdit("firstname")}
                  />
                </>
              )}
            </div>
          </div>
          <span className="user-modal-separator"> </span>
          <div className="user-modal-info-item">
            <label className="user-modal-info-label" htmlFor="username">
              Pseudo
            </label>
            <div className="user-modal-info-value">
              {editModes.username ? (
                <>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                  <Save
                    size={16}
                    className="save-icon"
                    onClick={() => toggleEdit("username")}
                  />
                  <X
                    size={16}
                    className="cancel-icon"
                    onClick={() => toggleEdit("username")}
                  />
                </>
              ) : (
                <>
                  <p>{user.username}</p>
                  <Pencil
                    size={16}
                    className="edit-icon"
                    onClick={() => toggleEdit("username")}
                  />
                </>
              )}
            </div>
          </div>
          <span className="user-modal-separator"> </span>
          <div className="user-modal-info-item">
            <label className="user-modal-info-label" htmlFor="email">
              Adresse e-mail
            </label>
            <div className="user-modal-info-value">
              {editModes.email ? (
                <>
                  <input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                  <Save
                    size={16}
                    className="save-icon"
                    onClick={() => toggleEdit("email")}
                  />
                  <X
                    size={16}
                    className="cancel-icon"
                    onClick={() => toggleEdit("email")}
                  />
                </>
              ) : (
                <>
                  <p>{user.email}</p>
                  <Pencil
                    size={16}
                    className="edit-icon"
                    onClick={() => toggleEdit("email")}
                  />
                </>
              )}
            </div>
          </div>
          <span className="user-modal-separator"> </span>
          <div className="user-modal-info-item">
            <label className="user-modal-info-label" htmlFor="phone_number">
              Numéro de téléphone
            </label>
            <div className="user-modal-info-value">
              {editModes.phone_number ? (
                <>
                  <input
                    type="text"
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone_number: e.target.value,
                      }))
                    }
                  />
                  <Save
                    size={16}
                    className="save-icon"
                    onClick={() => toggleEdit("phone_number")}
                  />
                  <X
                    size={16}
                    className="cancel-icon"
                    onClick={() => toggleEdit("phone_number")}
                  />
                </>
              ) : (
                <>
                  <p>{user.phone_number}</p>
                  <Pencil
                    size={16}
                    className="edit-icon"
                    onClick={() => toggleEdit("phone_number")}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <h3>Gérer Mon Compte</h3>
        <div className="user-modal-buttons-container">
          <button type="button" className="user-modal-action-button">
            <KeyRound size={16} />
            Modifier mon mot de passe
          </button>
          <button type="button" className="user-modal-action-button delete">
            <UserX size={16} />
            Supprimer mon compte
          </button>
          <button type="button" className="user-modal-action-button logout">
            <LogOut size={16} />
            Me déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
