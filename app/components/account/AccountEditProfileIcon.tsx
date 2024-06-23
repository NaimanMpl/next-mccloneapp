import { uploadAvatar, uploadFile } from '@/app/api/upload/upload.action'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Upload } from 'lucide-react'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { useAuth } from '../AuthProvider'

interface AccountEditProfileIconProps {
  profileIconUrl: string
}

const AccountEditProfileIcon = ({ profileIconUrl }: AccountEditProfileIconProps) => {

  const [ selectedFile, setSelectedFile ] = useState(profileIconUrl);
  const [ filename, setFilename ] = useState('');
  const { toast } = useToast();
  const { user, setUser } = useAuth();
  const [ loading, setLoading ] = useState(false);

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

    setLoading(true);
    try {
      const profileIconUrl = await uploadAvatar(formData);
      setUser({ ...user, profileIconUrl: profileIconUrl });
      setFilename('');
      setSelectedFile(profileIconUrl);
      toast({ title: 'Succès', description: 'Votre photo de profil a été mis à jour', variant: 'default' })
    } catch (e) {
      toast({ title: 'Uh-oh ! Un problème est survenu', description: 'Impossible de traiter votre requête', variant: 'destructive' })
    }
    setLoading(false);

  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      return;
    }
    const filename = file.name;
    setFilename(filename);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFile(reader.result as string);
    }
    reader.readAsDataURL(file);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className='pb-0'>
          <div className='flex justify-between w-full'>
            <div>
              <CardTitle className='text-xl font-semibold pb-2'>Photo de profil</CardTitle>
              <CardDescription>Ceci est votre photo de profil. Vous pouvez la changer en cliquant desssus.</CardDescription>
            </div>
            <img className='rounded-full w-24 h-24' src={selectedFile} alt='Profile Icon' />
          </div>
        </CardHeader>
        <CardContent>
          <Button type='button'>
            <Upload className='w-5 h-5 mr-2' />
            <label className='inline-block font-semibold py-2 rounded-md cursor-pointer' htmlFor="file">Télécharger un fichier</label>
            <input onChange={handleChange} className='hidden' type="file" name="file" id="file" />
          </Button>
        </CardContent>
        <CardFooter className='border-t border-border px-6 py-2'>
          <div className='flex justify-between items-center w-full'>
            <CardDescription>C'est toujours mieux avec que sans !</CardDescription>
            <Button type='submit' disabled={loading}>
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Sauvegarder
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}

export default AccountEditProfileIcon