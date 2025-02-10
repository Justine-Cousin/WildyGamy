import "../styles/DeleteAccountConfirmModal.css";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="delete-confirm-modal-overlay"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <div
        className="delete-confirm-modal-content"
        onClick={handleModalClick}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="delete-confirm-modal-buttons">
          <button
            type="button"
            className="delete-confirm-button cancel"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            type="button"
            className="delete-confirm-button confirm"
            onClick={onConfirm}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
