import React from "react";
import "./FileGrid.css";
import { FileCard } from "../FileCard/FileCard";
import type { FileItem } from "../../model/types";

interface FileGridProps {
  files: FileItem[];
  onSelect: (id: string) => void;
}

export const FileGrid: React.FC<FileGridProps> = ({ files, onSelect }) => {
  return (
    <div className="file-grid">
      {files.map((file) => (
        <FileCard key={file.id} file={file} onSelect={onSelect} />
      ))}
    </div>
  );
};
