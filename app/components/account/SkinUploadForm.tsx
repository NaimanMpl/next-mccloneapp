'use client';
import { uploadFile } from '@/app/api/upload/upload.action';
import { Button, buttonVariants } from '@/components/ui/button';
import React, { FormEventHandler, useState } from 'react';
import AccountInfoCard from './AccountInfoCard';
import AccountInfoParagraph from './AccountInfoParagraph';

const SkinUploadForm = () => {

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = await uploadFile('skins', formData);
    
    setImageUrl(url);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AccountInfoCard 
          title='Changer de skin' 
          img='/default-pp.png' 
          tip="Le fichier ne peut dépasser 1 mo"
          button={<Button>Upload</Button>}
        >
          <AccountInfoParagraph>Le skin est utilisé dans le jeu pour modifier l'aspect visuel de votre personnage</AccountInfoParagraph>
          <div className='mt-4'>
            <label className='inline-block text-foreground font-semibold px-4 py-2 rounded-md cursor-pointer' htmlFor="file">Télécharger un fichier</label>
            <input className='hidden' type="file" name="file" id="file" />
          </div>
        </AccountInfoCard>
      </form>
    </>
  )
}

export default SkinUploadForm