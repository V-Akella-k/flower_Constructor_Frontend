export interface RequestFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
}

export interface RequestFormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
}

export interface UseRequestFormReturn {
  formData: RequestFormData;
  errors: RequestFormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<boolean>;
  validateForm: () => boolean;
  isLoading: boolean;
  submitSuccess: boolean;
}