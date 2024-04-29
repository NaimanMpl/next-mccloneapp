import { RegisterFormData } from "../hooks/useRegisterForm";

export const registerUser = async (formData: RegisterFormData) => {
  const request = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(formData)
  });

  const response = await request.json();

  if (!response.ok) {
    throw new Error(response.error);
  }

  return response;
}