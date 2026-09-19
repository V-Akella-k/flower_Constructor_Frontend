export interface OrderFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
}

export interface OrderFormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
}

export interface UseOrderFormReturn {
  formData: OrderFormData;
  errors: OrderFormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<boolean>;
  validateForm: () => boolean;
  isLoading: boolean;
  submitSuccess: boolean;
}