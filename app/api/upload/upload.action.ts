'use server';
import { put } from "@vercel/blob";

export const uploadFile = async (folder: string, formData: FormData) => {
  const file = formData.get('file') as File;
  const filename = file.name;

  const blob = await put(`${folder}/${filename}`, file, {
    access: 'public'
  });

  return blob.url;
}