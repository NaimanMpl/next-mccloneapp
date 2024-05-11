'use server';
import { getUser } from "@/app/actions/user.action";
import { put } from "@vercel/blob";

export const uploadFile = async (folder: string, formData: FormData) => {

  const user = await getUser();

  if (user == null) {
    return;
  }

  const file = formData.get('file') as File;
  const extension = file.name.split('.').pop();

  const blob = await put(`${folder}/${user.id}.${extension}`, file, {
    access: 'public'
  });
  
  return blob.url;
}