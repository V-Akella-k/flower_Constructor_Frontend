import { useState } from 'react';
import type { RequestFormData, RequestFormErrors, UseRequestFormReturn } from './types';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useRequestForm = (): UseRequestFormReturn => {
  const [formData, setFormData] = useState<RequestFormData>({
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState<RequestFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false); // Добавлено состояние

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof RequestFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: RequestFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Компания обязательна для заполнения';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен для заполнения';
    } else if (formData.phone.replace(/\D/g, '').length < 11) {
      newErrors.phone = 'Некорректный номер телефона';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    
    // Если пользователь вводит 7 в начале, убираем её
    let cleanNumbers = numbers;
    if (numbers.startsWith('7')) {
      cleanNumbers = numbers.substring(1);
    }
    
    let formatted = '+7(';
    
    if (cleanNumbers.length > 0) {
      formatted += cleanNumbers.substring(0, 3);
    }
    if (cleanNumbers.length > 3) {
      formatted += ')' + cleanNumbers.substring(3, 6);
    }
    if (cleanNumbers.length > 6) {
      formatted += '-' + cleanNumbers.substring(6, 8);
    }
    if (cleanNumbers.length > 8) {
      formatted += '-' + cleanNumbers.substring(8, 10);
    }
    
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    
    // Разрешаем ввод до 10 цифр (без +7)
    if (value.length <= 11) {
      setFormData(prevState => ({
        ...prevState,
        phone: formatPhone(value)
      }));

      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return false;
    }

    setIsLoading(true);
    
    try {
      // Подготовка данных для отправки
      const dataToSend = {
        name: formData.name.trim(),
        company: formData.company.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/[^\d+]/g, '')
      };

      console.log('Отправка данных на сервер:', dataToSend);

      // Отправка на бэкенд
      const response = await fetch(`${API_URL}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();

      // Сброс формы после успешной отправки
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: ''
      });

      setSubmitSuccess(true);
      return true;

    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    validateForm,
    isLoading,
    submitSuccess
  };
};