import type React from "react";
import { useEffect, useState } from "react";
import "../../styles/ModalAdminGame.css";
import type { ModalProps } from "../../services/types";

type Errors = {
  name?: string;
  description?: string;
  image?: string;
  price?: string;
};

const ModalAdminGame: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  gameData,
  onSave,
  mode,
}) => {
  const [name, setName] = useState(gameData?.name || "");
  const [description, setDescription] = useState(gameData?.description || "");
  const [image, setImage] = useState<string>(gameData?.image || "");
  const [price, setPrice] = useState(gameData?.price?.toString() || "");
  const [errors, setErrors] = useState<Errors>({});
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  useEffect(() => {
    if (gameData) {
      setName(gameData.name || "");
      setDescription(gameData.description || "");
      setImage(typeof gameData.image === "string" ? gameData.image : "");
      setPrice(gameData.price?.toString() || "");
    }
  }, [gameData]);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!description.trim()) {
      newErrors.description = "La description est requise";
    }

    if (!price.trim()) {
      newErrors.price = "Le prix est requis";
    } else if (!/^\d+$/.test(price.trim())) {
      newErrors.price = "Le prix doit être un nombre";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({ name, description, image, price });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      onKeyUp={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === "Enter" && e.stopPropagation()}
      >
        <div className="edit-modal">
          <h2 className="edit-modal-title">
            {mode === "edit" ? "MODIFIER LE JEU" : "AJOUTER UN JEU"}
          </h2>
          <div className="edit-modal-content">
            <div className="image-section">
              <div className="form-group">
                <label htmlFor="image" className="edit-modal-label">
                  Image URL
                </label>
                <div className="image-input-container">
                  <input
                    type="text"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className={`edit-modal-input ${errors.image ? "input-error" : ""}`}
                  />
                  <button
                    type="button"
                    className="preview-button"
                    onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                  >
                    {isPreviewVisible ? "Cacher" : "Prévisualiser"}
                  </button>
                </div>
                {errors.image && (
                  <span className="error-message">{errors.image}</span>
                )}
              </div>
              {isPreviewVisible && (
                <div className="image-preview">
                  {image ? (
                    <img src={image} alt="Prévisualisation" />
                  ) : (
                    <div className="no-image">Aucune image</div>
                  )}
                </div>
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
                <label htmlFor="description" className="edit-modal-label">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`edit-modal-textarea ${errors.description ? "input-error" : ""}`}
                />
                {errors.description && (
                  <span className="error-message">{errors.description}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="price" className="edit-modal-label">
                  Prix <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`edit-modal-input ${errors.price ? "input-error" : ""}`}
                />
                {errors.price && (
                  <span className="error-message">{errors.price}</span>
                )}
              </div>
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
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAdminGame;
