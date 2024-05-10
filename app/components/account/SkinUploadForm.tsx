'use client';
import { uploadFile } from '@/app/api/upload/upload.action';
import { url } from 'inspector';
import Image from 'next/image';
import React, { FormEventHandler, useState } from 'react';
import Button from '../ui/Button';

const SkinUploadForm = () => {

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = await uploadFile('skins', formData);
    
    setImageUrl(url);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" id="file" />
      {imageUrl ? <img src={imageUrl} alt='Skin' /> : null}
      <Button label='Upload' backgroundColor='bg-gold-0' color='black' submit fullWidth={false} />
    </form>
  )
}

export default SkinUploadForm