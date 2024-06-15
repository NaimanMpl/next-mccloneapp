import { User } from "../models/user.model";

export const uploadSkin = async (formData: FormData, filename: string) => {
  const res = await fetch(
    '/api/user/skin/upload', 
    {
      method: 'POST',
      body: formData.get('file') as File
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(
    '/api/users',
    {
      method: 'GET'
    }
  );
  if (!res.ok) {
    return [];
  }

  const users = await res.json();
  return users;
}

export const updateUser = async (id: string | undefined, email: string | undefined, name: string | undefined, role: string | undefined, admin: boolean | undefined): Promise<User> => {
  try {
    const res = await fetch(
      `/api/users/update?id=${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json'
        },
        body: JSON.stringify({ email, name, role, admin })
      }
    );
    if (!res.ok) {
      throw new Error('Oops.. Un problème est survenue');
    }
    const data = await res.json();
    return data.user;
  } catch (e) {
    throw new Error('Oops.. Un problème est survenue');
  }
}