import React from "react";
import "./ConfirmationModal.css";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <p className="modal-text">Удалить выбранные файл(ы)?</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="modal-cancel">
            Отмена
          </button>
          <button onClick={onConfirm} className="modal-confirm">
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
