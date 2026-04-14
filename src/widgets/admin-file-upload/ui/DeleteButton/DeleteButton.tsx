import React from "react";
import "./DeleteButton.css";

interface DeleteButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  disabled,
  onClick,
}) => {
  return (
    <button className="delete-button" onClick={onClick} disabled={disabled}>
      Удалить выбранные элементы
    </button>
  );
};
