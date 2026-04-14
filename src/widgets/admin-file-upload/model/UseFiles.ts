import { useState } from "react";
import type { FileItem } from "./types";

export const UseFiles = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  //Загрузка файлов 
  const handleUpload = (uploadedFiles: FileList) => {
    const newFiles: FileItem[] = Array.from(uploadedFiles).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
      selected: false,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  };

  //Выбор / снятие выбора 
  const handleSelect = (id: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, selected: !f.selected } : f))
    );
  };

  //Удаление
  const handleDeleteClick = () => setShowConfirm(true);

  const handleConfirmDelete = () => {
    setFiles((prev) => prev.filter((f) => !f.selected));
    setShowConfirm(false);
  };

  return {
    files,
    showConfirm,
    setShowConfirm,
    handleUpload,
    handleSelect,
    handleDeleteClick,
    handleConfirmDelete,
  };
};
