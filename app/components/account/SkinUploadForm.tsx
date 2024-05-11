'use client';
import { uploadFile } from '@/app/api/upload/upload.action';
import { uploadSkin } from '@/app/services/userservice';
import logger from '@/app/utils/logger';
import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import React, { ChangeEventHandler, FormEventHandler, useContext, useState } from 'react';
import { AuthContext, AuthPayload } from '../AuthProvider';
import AccountInfoCard from './AccountInfoCard';
import AccountInfoParagraph from './AccountInfoParagraph';
import SkinFileCard from './SkinFileCard';

const SkinUploadForm = () => {

  const [filename, setFilename] = useState('');
  const { toast } = useToast();
  const { user, setUser }: AuthPayload = useContext(AuthContext);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (!user) {
      return;
    }

    if (filename.length === 0) {
      toast({ title: 'Uh-oh !', description: 'Veuillez renseigner un fichier', variant: 'destructive' })
      return;
    }

    try {
      const skinUrl = await uploadFile('skins', formData);
      setUser({ ...user, skin: skinUrl });
      setFilename('');
      toast({ title: 'Succès', description: 'Votre skin a été mis à jour', variant: 'success' })
    } catch (e) {
      logger.error(e)
      toast({ title: 'Uh-oh ! Un problème est survenu', description: 'Impossible de traiter votre requête', variant: 'destructive' })
    }

  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      return;
    }
    const filename = file.name;
    setFilename(filename);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <AccountInfoCard
          title='Changer de skin' 
          img={user?.skin}
          tip="Le fichier ne peut dépasser 1 mo"
          button={<Button>Upload</Button>}
        >
          <AccountInfoParagraph>Le skin est utilisé dans le jeu pour modifier l'aspect visuel de votre personnage</AccountInfoParagraph>
          <div className='mt-4'>
            <label className='inline-block text-foreground font-semibold px-4 py-2 rounded-md cursor-pointer' htmlFor="file">Télécharger un fichier</label>
            <input onChange={handleChange} className='hidden' type="file" name="file" id="file" />
          </div>
        </AccountInfoCard>
      </form>
      {filename !== '' && <SkinFileCard name={filename} size={1.22} />}
    </>
  )
}

export default SkinUploadForm