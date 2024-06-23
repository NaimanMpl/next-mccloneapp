'use client';
import { UserPayload } from '@/app/models/user.model';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import AccountDeleteUserForm from './AccountDeleteUserForm';
import AccountEditEmailForm from './AccountEditEmailForm';
import AccountEditUsernameForm from './AccountEditUsernameForm';

interface AccountPageContentProps {
  user: UserPayload
}

const AccountPageContent = ({ user }: AccountPageContentProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex justify-between w-full gap-10'>
            <div>
              <CardTitle className='text-xl font-semibold pb-2'>Photo de profil</CardTitle>
              <CardDescription>Ceci est votre photo de profil. Vous pouvez la changer en cliquant desssus.</CardDescription>
            </div>
            <img className='rounded-full w-24 h-24' src='/default-pp.png' alt='' />
          </div>
        </CardHeader>
        <CardFooter className='border-t border-border px-6 py-2'>
          <div className='flex justify-between items-center w-full'>
            <CardDescription>C'est toujours mieux avec que sans !</CardDescription>
            <Button>Sauvegarder</Button>
          </div>
        </CardFooter>
      </Card>

      <AccountEditUsernameForm username={user.name} />
      <AccountEditEmailForm email={user.email} />
      <AccountDeleteUserForm userId={user.id} />
    </>
  )
}

export default AccountPageContent