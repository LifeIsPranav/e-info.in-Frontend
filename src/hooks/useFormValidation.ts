import { useState, useCallback } from 'react';

type ValidationRule<T> = (value: T) => string | null;

interface ValidationRules<T> {
  [K in keyof T]?: ValidationRule<T[K]>[];
}

interface ValidationErrors<T> {
  [K in keyof T]?: string;
}

interface UseFormValidationReturn<T> {
  errors: ValidationErrors<T>;
  validate: (field?: keyof T) => boolean;
  validateField: (field: keyof T, value: T[keyof T]) => string | null;
  clearError: (field: keyof T) => void;
  clearAllErrors: () => void;
  hasErrors: boolean;
  isValid: boolean;
}

/**
 * Hook for form validation with field-level and form-level validation
 */
export function useFormValidation<T extends Record<string, any>>(
  data: T,
  rules: ValidationRules<T>,
): UseFormValidationReturn<T> {
  const [errors, setErrors] = useState<ValidationErrors<T>>({});

  const validateField = useCallback(
    (field: keyof T, value: T[keyof T]): string | null => {
      const fieldRules = rules[field];
      if (!fieldRules) return null;

      for (const rule of fieldRules) {
        const error = rule(value);
        if (error) return error;
      }

      return null;
    },
    [rules],
  );

  const validate = useCallback(
    (field?: keyof T): boolean => {
      if (field) {
        // Validate single field
        const error = validateField(field, data[field]);
        setErrors(prev => ({
          ...prev,
          [field]: error,
        }));
        return !error;
      }

      // Validate all fields
      const newErrors: ValidationErrors<T> = {};
      let isValid = true;

      for (const key in data) {
        const error = validateField(key, data[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }

      setErrors(newErrors);
      return isValid;
    },
    [data, validateField],
  );

  const clearError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const hasErrors = Object.keys(errors).length > 0;
  const isValid = !hasErrors;

  return {
    errors,
    validate,
    validateField,
    clearError,
    clearAllErrors,
    hasErrors,
    isValid,
  };
}

// Common validation rules
export const validationRules = {
  required: <T>(value: T): string | null => {
    if (value === null || value === undefined || value === '') {
      return 'This field is required';
    }
    return null;
  },

  email: (value: string): string | null => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  },

  minLength: (min: number) => (value: string): string | null => {
    if (!value) return null;
    return value.length >= min ? null : `Must be at least ${min} characters`;
  },

  maxLength: (max: number) => (value: string): string | null => {
    if (!value) return null;
    return value.length <= max ? null : `Must be no more than ${max} characters`;
  },

  url: (value: string): string | null => {
    if (!value) return null;
    try {
      new URL(value.startsWith('http') ? value : `https://${value}`);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },
};

export default useFormValidation;