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

  if (!request.ok) {
    throw new Error(response.message);
  }

  return response;
}

export const getCurrentUser = async (): Promise<UserPayload | null> => {
  const res = await fetch('/api/auth/me', {
    method: 'GET',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export const isUsernameAvailable = async (username: string): Promise<boolean> => {
  const res = await fetch(
    `/api/users/find?username=${username}`,
    {
      method: 'GET'
    }
  );

  if (!res.ok) {
    return false;
  }
  const data = await res.json();

  return !data.user;
}

export const isEmailAvailable = async (email: string): Promise<boolean> => {
  const res = await fetch(
    `/api/users/find?email=${email}`,
    {
      method: 'GET'
    }
  );

  if (!res.ok) {
    return false;
  }
  const data = await res.json();

  return !data.user;
}