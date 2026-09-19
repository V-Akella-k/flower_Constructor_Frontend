import { useOrderForm } from '../model/useOrderForm';
import './order-form.css';
import { useState } from 'react';

export const OrderForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    formData,
    errors,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    isLoading
  } = useOrderForm();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем валидность формы перед отправкой
    const success = await handleSubmit(e);
    
    if (success) {
      setIsOpen(true); // Показываем уведомление только при успешной отправке
      
      // Автоматически скрываем уведомление через 3 секунды
      setTimeout(() => setIsOpen(false), 3000);
    }
  };

  return (
    <div className="order__form__container">
      {/* Уведомление об успешной отправке */}
      {isOpen && (
        <div className="order__success-message">
          Заявка успешно отправлена!
        </div>
      )}
      
      <form onSubmit={handleFormSubmit} className="order__form" noValidate>
        <div className="order__form__group">
          <label htmlFor="name" className="order__form__label">
            Имя Фамилия
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введите имя и фамилию"
            className={`order__form-input ${errors.name ? 'error' : ''}`}
            required
            disabled={isLoading}
          />
          {errors.name && <span className="order__error-message">{errors.name}</span>}
        </div>
        
        <div className="order__form__group">
          <label htmlFor="company" className="order__form__label">
            Компания
          </label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Введите название компании"
            className={`order__form-input ${errors.company ? 'error' : ''}`}
            required
            disabled={isLoading}
          />
          {errors.company && <span className="order__error-message">{errors.company}</span>}
        </div>
        
        <div className="order__form__group">
          <label htmlFor="email" className="order__form__label">
            Почта
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className={`order__form-input ${errors.email ? 'error' : ''}`}
            required
            disabled={isLoading}
          />
          {errors.email && <span className="order__error-message">{errors.email}</span>}
        </div>
        
        <div className="order__form__group">
          <label htmlFor="phone" className="order__form__label">
            Телефон
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="+7(___)___-__-__"
            className={`order__form-input ${errors.phone ? 'error' : ''}`}
            required
            disabled={isLoading}
          />
          {errors.phone && <span className="order__error-message">{errors.phone}</span>}
        </div>
        
        <div className='benefits-section__buttons'>
          <button 
            className="benefits-section__open-popup" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Отправка...' : 'Оставить заявку'}
          </button>
        </div>
      </form>
    </div>
  );
};