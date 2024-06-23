'use client';
import { uploadFile } from '@/app/api/upload/upload.action';
import logger from '@/app/utils/logger';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';
import React, { ChangeEventHandler, FormEventHandler, useContext, useState } from 'react';
import { useAuth } from '../AuthProvider';
import SkinFileCard from './SkinFileCard';

const SkinUploadForm = () => {

  const [filename, setFilename] = useState('');
  const { toast } = useToast();
  const { user, setUser } = useAuth();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (!user) {
      return;
    }

    if (filename.length === 0) {
      toast({ title: 'Pas si vite !', description: 'Veuillez renseigner un fichier', variant: 'default' })
      return;
    }

    try {
      const skinUrl = await uploadFile('skins', formData);
      setUser({ ...user, skin: skinUrl });
      setFilename('');
      toast({ title: 'Succès', description: 'Votre skin a été mis à jour', variant: 'default' })
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
        <Card>
          <CardHeader>
            <CardTitle className='text-xl'>Changer de skin</CardTitle>
            <CardDescription>Le skin est utilisé dans le jeu pour modifier l'aspect visuel de votre personnage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='mt-4'>
              <Button type='button'>
                <Upload className='w-5 h-5 mr-2' />
                <label className='inline-block font-semibold py-2 rounded-md cursor-pointer' htmlFor="file">Télécharger un fichier</label>
                <input onChange={handleChange} className='hidden' type="file" name="file" id="file" />
              </Button>
            </div>
          </CardContent>
          <CardFooter className='border-t border-border px-6 py-2'>
            <div className='flex justify-between items-center w-full'>
              <CardDescription>Le fichier ne doit pas dépasser 1mo.</CardDescription>
              <Button type='submit'>Sauvegarder</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
      {filename !== '' && <SkinFileCard name={filename} size={1.22} />}
    </>
  )
}

export default SkinUploadForm