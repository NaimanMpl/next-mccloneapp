import { Users } from "@prisma/client";

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

export const getUsers = async (): Promise<Users[]> => {
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

export const updateUser = async (id: string | undefined, email: string | undefined, name: string | undefined, role: string | undefined, admin: boolean | undefined) => {
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
  } catch (e) {
    throw new Error('Oops.. Un problème est survenue');
  }
}