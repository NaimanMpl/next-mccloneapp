import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React from 'react';

interface AccountEditUsernameFormProps {
  username: string
}

const AccountEditUsernameForm = ({ username }: AccountEditUsernameFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Nom d'utilisateur</CardTitle>
        <CardDescription>Le nom d'utilisateur est utilisé pour vous différencier des autres joueurs.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Input className='mt-3 w-80' type='text' defaultValue={username} />
        </form>
      </CardContent>
      <CardFooter className='border-t border-border px-6 py-2'>
        <div className='flex justify-between items-center w-full'>
          <CardDescription>Veuillez ne pas dépasser 20 caractères.</CardDescription>
          <Button>Sauvegarder</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default AccountEditUsernameForm