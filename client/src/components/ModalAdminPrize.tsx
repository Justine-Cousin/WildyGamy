import type React from "react";
import { useEffect, useState } from "react";
import logoWG from "../assets/images/logo_wildy_gamy.png";
import type { ModalProps } from "../services/types";
import "../styles/ModalAdminGame.css";

type Errors = {
  name?: string;
  description?: string;
  image?: string;
  exchange_price?: string;
};

const ModalAdminPrize: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  prizeData,
  onSave,
  mode,
}) => {
  const [name, setName] = useState(prizeData?.name || "");
  const [description, setDescription] = useState(prizeData?.description || "");
  const [image, setImage] = useState(prizeData?.image || logoWG);
  const [exchange_price, setExchangePrice] = useState(
    prizeData?.exchange_price?.toString() || "",
  );
  const [errors, setErrors] = useState<Errors>({});
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  useEffect(() => {
    if (prizeData) {
      setName(prizeData.name || "");
      setDescription(prizeData.description || "");
      setImage(prizeData.image || "");
      setExchangePrice(prizeData.exchange_price?.toString() || "");
    }
  }, [prizeData]);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!description.trim()) {
      newErrors.description = "La description est requise";
    }

    if (!exchange_price.trim()) {
      newErrors.exchange_price = "Le prix est requis";
    } else if (!/^\d+$/.test(exchange_price.trim())) {
      newErrors.exchange_price = "Le prix doit être un nombre entier";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({
        name,
        description,
        image,
        exchange_price,
      });
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
            {mode === "edit" ? "MODIFIER LE LOT" : "AJOUTER UN LOT"}
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
                    className={`edit-modal-textarea ${errors.description ? "input-error" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                    className="preview-button"
                  >
                    {isPreviewVisible ? "Cacher" : "Prévisualiser"}
                  </button>
                  <div>
                    {errors.image && (
                      <span className="error-message">{errors.image}</span>
                    )}
                  </div>
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
                  className={`edit-modal-input ${errors.description ? "input-error" : ""}`}
                />
                {errors.description && (
                  <span className="error-message">{errors.description}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exchange_price" className="edit-modal-label">
                  Prix d'échange <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="exchange_price"
                  value={exchange_price}
                  onChange={(e) => setExchangePrice(e.target.value)}
                  className={`edit-modal-input ${errors.exchange_price ? "input-error" : ""}`}
                />
                {errors.exchange_price && (
                  <span className="error-message">{errors.exchange_price}</span>
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

export default ModalAdminPrize;
