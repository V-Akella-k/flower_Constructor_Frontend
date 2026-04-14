import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";

interface AdminLoginProps {
  onSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        login,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        onSuccess();
      } else {
        setError("Не удалось получить токен от сервера");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка входа");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">
          Войти
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};

