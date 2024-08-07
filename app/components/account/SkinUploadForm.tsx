'use client';
import { uploadSkin } from '@/app/api/upload/upload.action';
import { UploadError } from '@/app/models/error.model';
import { UserPayload } from '@/app/models/user.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Upload } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { ChangeEventHandler, FormEventHandler, useContext, useState } from 'react';
import AccountPageSkeleton from './AccountPageSkeleton';
import SkinFileCard from './SkinFileCard';

const SkinUploadForm = () => {

  const [filename, setFilename] = useState('');
  const { toast } = useToast();
  const { data: session, update } = useSession();
  const [ loading, setLoading ] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (!session) {
      return;
    }

    if (filename.length === 0) {
      toast({ title: 'Pas si vite !', description: 'Veuillez renseigner un fichier', variant: 'default' })
      return;
    }

    setLoading(true);
    try {
      const skinUrl = await uploadSkin(session.user as UserPayload, formData);
      update({
        ...session,
        user: {
          ...session.user,
          skin: skinUrl
        }
      });
      setFilename('');
      toast({ title: 'Succès', description: 'Votre skin a été mis à jour', variant: 'default' })
    } catch (e) {
      const message = (e as Error).message;
      toast({ title: 'Uh-oh !', description: message, variant: 'destructive' })
    }
    setLoading(false);

  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      return;
    }

    if (file.size > 1000000) {
      toast({ title: 'Pas si vite !', description: 'La taille de votre fichier ne doit pas dépasser 1mo.' })
      return;
    }
    
    const filename = file.name;
    setFilename(filename);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {
          !session &&
          <AccountPageSkeleton />
        }
        {
          session &&
          <Card>
            <CardHeader className='pb-0'>
              <div className='flex justify-between w-full'>
                <div>
                  <CardTitle className='text-xl font-semibold pb-2'>Changer de skin</CardTitle>
                  <CardDescription>Le skin est utilisé dans le jeu pour modifier l'aspect visuel de votre personnage.</CardDescription>
                </div>
                <img className='rounded-full w-24 h-24' src={session.user.skin} alt='Profile Icon' />
              </div>
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
                <Button type='submit' disabled={loading}>
                  {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                  Sauvegarder
                </Button>
              </div>
            </CardFooter>
          </Card>
        }
      </form>
      {filename !== '' && <SkinFileCard name={filename} size={1.22} />}
    </>
  )
}

export default SkinUploadForm