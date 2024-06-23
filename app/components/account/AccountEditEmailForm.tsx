import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React from 'react';

interface AccountEditEmailFormProps {
  email: string
}

const AccountEditEmailForm = ({ email }: AccountEditEmailFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Adresse mail</CardTitle>
        <CardDescription>Veuillez saisir une adresse email avec laquelle vous souhaitez pouvoir vous connecter.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Input className='mt-3 w-80' type='text' defaultValue={email} />
        </form>
      </CardContent>
      <CardFooter className='border-t border-border px-6 py-2'>
        <div className='flex justify-between items-center w-full'>
          <CardDescription>Les adresses emails doivent êtres vérifiés afin de pouvoir se connecter avec.</CardDescription>
          <Button>Sauvegarder</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default AccountEditEmailForm