import type React from "react";
import { useEffect, useState } from "react";
import type { ModalProps, UserSaveData } from "../../services/types";
import "../../styles/admin/ModalAdminUser.css";

type Errors = {
  name?: string;
  firstname?: string;
  email?: string;
  username?: string;
  phone_number?: string;
  profile_pic?: string;
};

const ModalAdminUser: React.FC<ModalProps<UserSaveData>> = ({
  isOpen,
  onClose,
  userData,
  onSave,
}) => {
  const [name, setName] = useState(userData?.name || "");
  const [firstname, setFirstname] = useState(userData?.firstname || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [username, setUsername] = useState(userData?.username || "");
  const [phone_number, setPhoneNumber] = useState(userData?.phone_number || "");
  const [profile_pic, setProfilePic] = useState(userData?.profile_pic || "");
  const [errors, setErrors] = useState<Errors>({});
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setFirstname(userData.firstname || "");
      setUsername(userData.username || "");
      setEmail(userData.email || "");
      setPhoneNumber(userData.phone_number || "");
      setProfilePic(userData.profile_pic || "");
    }
  }, [userData]);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!firstname.trim()) {
      newErrors.firstname = "Le prénom est requis";
    }

    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    }

    if (!username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    }

    if (!phone_number.trim()) {
      newErrors.phone_number = "Le numéro de téléphone est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        name,
        firstname,
        email,
        username,
        phone_number,
        profile_pic,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  function setImage(value: string): void {
    setProfilePic(value);
  }
  return (
    <div
      className="modal-admin-user modal-overlay"
      onClick={onClose}
      onKeyUp={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="modal-overlay"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      >
        <div
          className="modal-container"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.key === "Enter" && e.stopPropagation()}
        >
          <div className="edit-modal">
            <h2 className="edit-modal-title">MODIFIER L'UTILISATEUR</h2>
            <div className="edit-modal-content">
              <div className="image-section">
                <div className="form-group">
                  <label htmlFor="image" className="edit-modal-label">
                    Photo de profil
                  </label>
                  <div className="image-input-container">
                    <input
                      type="text"
                      id="image"
                      value={profile_pic}
                      onChange={(e) => setImage(e.target.value)}
                      className={`edit-modal-textarea ${errors.profile_pic ? "input-error" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                      className="preview-button"
                    >
                      {isPreviewVisible ? "Cacher" : "Prévisualiser"}
                    </button>
                    <div>
                      {errors.profile_pic && (
                        <span className="error-message">
                          {errors.profile_pic}
                        </span>
                      )}
                    </div>
                  </div>
                  {isPreviewVisible && (
                    <div className="image-preview">
                      {profile_pic ? (
                        <img src={profile_pic} alt="Prévisualisation" />
                      ) : (
                        <div className="no-image">Aucune image</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="firstname" className="edit-modal-label">
                  Prénom <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className={`edit-modal-input ${errors.firstname ? "input-error" : ""}`}
                />
                {errors.firstname && (
                  <span className="error-message">{errors.firstname}</span>
                )}
              </div>
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="name" className="edit-modal-label">
                    Nom <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`edit-modal-input ${errors.name ? "input-error" : ""}`}
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="edit-modal-label">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`edit-modal-input ${errors.email ? "input-error" : ""}`}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="username" className="edit-modal-label">
                    Nom d'utilisateur <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`edit-modal-input ${errors.username ? "input-error" : ""}`}
                  />
                  {errors.username && (
                    <span className="error-message">{errors.username}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone_number" className="edit-modal-label">
                    Numéro de téléphone <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone_number"
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`edit-modal-input ${errors.phone_number ? "input-error" : ""}`}
                  />
                  {errors.phone_number && (
                    <span className="error-message">{errors.phone_number}</span>
                  )}
                </div>
                <div className="edit-modal-buttons">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="edit-modal-save"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="edit-modal-cancel"
                  >
                    {" "}
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAdminUser;
