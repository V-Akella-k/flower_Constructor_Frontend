import React from "react";
import "./FileCard.css";
import type { FileItem } from "../../model/types";

interface FileCardProps {
  file: FileItem;
  onSelect: (id: string) => void;
}

export const FileCard: React.FC<FileCardProps> = ({ file, onSelect }) => {
  return (
    <div className="file-card">
      <input
        type="checkbox"
        checked={file.selected}
        onChange={() => onSelect(file.id)}
        className="file-card__checkbox"
      />
      <span className="file-card__name">{file.name}</span>
    </div>
  );
};
