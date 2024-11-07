import { ChangeEvent, FormEvent, useState } from "react";

export interface FormValues {
  [key: string]: string;
}

type UseFormReturnType = {
  formValues: FormValues;
  handleChange: (e: ChangeEvent<HTMLElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  resetForm: () => void;
};

export function useForm(
  initialValue: FormValues,
  onSubmit: (values: FormValues) => void
): UseFormReturnType {
  const [formValues, setFormValues] = useState<FormValues>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const resetForm = () => {
    setFormValues(initialValue);
  };

  return { formValues, handleChange, handleSubmit, resetForm };
}

export default useForm;
