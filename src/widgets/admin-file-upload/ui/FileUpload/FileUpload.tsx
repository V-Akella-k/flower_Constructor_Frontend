import React, { useRef, useState } from "react";
import "./FileUpload.css";

interface FileUploadProps {
  onUpload: (files: FileList) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("Файл не выбран");

  // Нажатие на жёлтую кнопку
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Выбор файла
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
      onUpload(files);
    } else {
      setFileName("Файл не выбран");
    }
  };

  return (
    <div className="file-upload">
      <input
        ref={fileInputRef}
        type="file"
        className="file-input-hidden"
        onChange={handleChange}
      />

       {/* Строка с текстом “Файл не выбран”  */}
      <div className="file-display">{fileName}</div>

      {/* Жёлтая кнопка */}
      <button type="button" className="upload-button" onClick={handleButtonClick}>
        Добавить файл
      </button>
    </div>
  );
};
