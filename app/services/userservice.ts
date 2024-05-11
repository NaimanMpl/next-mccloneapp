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