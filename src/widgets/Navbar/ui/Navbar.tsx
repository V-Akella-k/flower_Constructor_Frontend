import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/app/routes/routes";
import { requestFormStore } from "@/features/RequestForm/model/requestFormStore";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <nav className="navigation">
      <input
        type="checkbox"
        className="navigation__checkbox"
        id="menu-cb"
        checked={isOpen}
        onChange={toggleMenu}
      />
      <div className="navigation__content">
        <ul className="navigation__list">
          <li className="navigation__item">
            <span className="navigation__item-text" onClick={() => navigate(AppRoutes.Home)}>Главная</span>
          </li>
          <li className="navigation__item">
            <span className="navigation__item-text" onClick={() => navigate(AppRoutes.Constructor)}>Конструктор</span>
          </li>
          <li className="navigation__item">
            <span className="navigation__item-text" onClick={() => requestFormStore.open()}>Оставить заявку</span>
          </li>
        </ul>
      </div>
      <label className="navigation__button" htmlFor="menu-cb"></label>
    </nav>
  );
};


