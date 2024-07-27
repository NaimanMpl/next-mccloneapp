import axios from 'axios';
import {
  AddUserFormData,
  EditEmailFormData,
  EditPasswordFormData,
  EditUsernameFormData,
} from '../models/formsdata.model';
import { User, UsersPagination } from '../models/user.model';

export const uploadSkin = async (formData: FormData, filename: string) => {
  const res = await fetch('/api/user/skin/upload', {
    method: 'POST',
    body: formData.get('file') as File,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getUsers = async (page: number): Promise<UsersPagination> => {
  try {
    const { data } = await axios.get<UsersPagination>(
      `/api/users?page=${page}`
    );
    return data;
  } catch (e) {
    return { total: 0, nextPage: '/api/users', users: [] };
  }
};

export const updateUser = async (
  id: string | undefined,
  email: string | undefined,
  name: string | undefined,
  role: string | undefined,
  admin: boolean | undefined
): Promise<User> => {
  try {
    const res = await fetch(`/api/users/update?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, name, role, admin }),
    });
    if (!res.ok) {
      throw new Error('Oops.. Un problème est survenu');
    }
    const data = await res.json();
    return data.user;
  } catch (e) {
    throw new Error('Oops.. Un problème est survenu');
  }
};

export const addUser = async (formData: AddUserFormData): Promise<User> => {
  const res = await fetch('/api/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error('Oops.. Un problème est survenu');
  }

  const data = await res.json();
  return data.user;
};

export const deleteUser = async (
  userId: string
): Promise<{ id: string; name: string }> => {
  const res = await fetch(`/api/users?id=${userId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Oops.. Un problème est survenu');
  }
  const data = await res.json();
  return data.user;
};

export const saveUsername = async (
  formData: EditUsernameFormData
): Promise<string> => {
  try {
    const { data } = await axios.patch<{ username: string }>(
      `/api/auth/me?username=${formData.username}`
    );
    return data.username;
  } catch (e) {
    throw new Error('Oops.. Un problème est survenu');
  }
};

export const saveEmail = async (
  formData: EditEmailFormData
): Promise<string> => {
  try {
    const { data } = await axios.patch<{ email: string }>(
      `/api/auth/me?email=${formData.email}`
    );
    return data.email;
  } catch (e) {
    throw new Error('Un problème est survenu.');
  }
};

export const savePassword = async (formData: EditPasswordFormData) => {
  try {
    await axios.post('/api/auth/me', formData);
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    }

    throw new Error('Un problème est survenu.');
  }
};
