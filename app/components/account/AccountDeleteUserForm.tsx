import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React from 'react';
import DeleteAccontDialog from './DeleteAccontDialog';

interface AccountDeleteUserFormProps {
  userId: string
}

const AccountDeleteUserForm = ({ userId }: AccountDeleteUserFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Supprimer le compte</CardTitle>
        <CardDescription>Supprime de manière permante votre compte utilisateur du jeu, cette action n'est pas réversible.</CardDescription>
      </CardHeader>
      <CardFooter className='border border-border px-6 py-2 bg-destructive border-red-500 rounded-b-lg'>
        <div className='flex justify-between items-center w-full'>
          <CardDescription className='text-white'>Ce n'est qu'un aurevoir...</CardDescription>
          <DeleteAccontDialog />
        </div>
      </CardFooter>
    </Card>
  )
}

export default AccountDeleteUserForm