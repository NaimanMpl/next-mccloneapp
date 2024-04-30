import { LoginFormData } from "../hooks/useLoginForm";
import { RegisterFormData } from "../hooks/useRegisterForm";

export const registerUser = async (formData: RegisterFormData) => {
  const request = await fetch(
    '/api/auth/register', 
    {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(formData)
    }
  );

  const response = await request.json();

  if (!response.ok) {
    throw new Error(response.message);
  }

  return response;
}

export const loginUser = async (formData: LoginFormData) => {
  const request = await fetch(
    '/api/auth/login', 
    {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(formData)
    }
  );
  const response = await request.json();

  if (!response.ok) {
    throw new Error(response.message);
  }

  return response;
}