import { LoginFormData } from "../hooks/useLoginForm";
import { RegisterFormData } from "../hooks/useRegisterForm";
import { UserPayload } from "../models/user.model";

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
  console.log(response)
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

export const getCurrentUser = async (): Promise<UserPayload | null> => {
  const res = await fetch('http://localhost:3000/api/auth/me', {
    method: 'GET',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}