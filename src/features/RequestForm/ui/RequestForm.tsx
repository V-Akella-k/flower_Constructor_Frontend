import { useRequestForm } from '../model/useRequestForm';
import './request-form.css';
import { useState } from 'react';

export const RequestForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    formData,
    errors,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    isLoading
  } = useRequestForm();

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
    <div className="request__form__container">
      {/* Уведомление об успешной отправке */}
      {isOpen && (
        <div className="request__success-message">
          Заявка успешно отправлена!
        </div>
      )}
      
      <form onSubmit={handleFormSubmit} className="request__form" noValidate>
        <div className="request__form__group">
          <label htmlFor="name" className="request__form__label">
            Имя Фамилия
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Введите имя и фамилию"
            className={`request__form-input ${errors.name ? 'error' : ''}`}
            required
            disabled={isLoading}
          />
          {errors.name && <span className="request__error-message">{errors.name}</span>}
        </div>
        
        <div className="request__form__group">
          <label htmlFor="company" className="request__form__label">
            Компания
          </label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Введите название компании"
            className={`request__form-input ${errors.company ? 'error' : ''}`}
            required
            disabled={isLoading}
          />
          {errors.company && <span className="request__error-message">{errors.company}</span>}
        </div>
        
        <div className="request__form__group">
          <label htmlFor="email" className="request__form__label">
            Почта
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className={`request__form-input ${errors.email ? 'error' : ''}`}
            required
            disabled={isLoading}
          />
          {errors.email && <span className="request__error-message">{errors.email}</span>}
        </div>
        
        <div className="request__form__group">
          <label htmlFor="phone" className="request__form__label">
            Телефон
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="+7(___)___-__-__"
            className={`request__form-input ${errors.phone ? 'error' : ''}`}
            required
            disabled={isLoading}
          />
          {errors.phone && <span className="request__error-message">{errors.phone}</span>}
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