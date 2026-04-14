import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import { AdminLogin } from "@/widgets/auth-admin";
import { FileUpload, FileGrid, DeleteButton, ConfirmationModal } from "@/widgets/admin-file-upload";
import { UseFiles } from "@/widgets/admin-file-upload";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { files, showConfirm, setShowConfirm, handleUpload, handleSelect, handleDeleteClick, handleConfirmDelete } = UseFiles();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (loading) {
    return <div className="admin-loading">Проверка авторизации...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <AdminLogin onSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="admin-page">
      <FileUpload onUpload={handleUpload} />
      <FileGrid files={files} onSelect={handleSelect} />
      <DeleteButton
        disabled={!files.some((f) => f.selected)}
        onClick={handleDeleteClick}
      />
      {showConfirm && (
        <ConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default AdminPage;
