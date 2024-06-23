'use client';
import { UserPayload } from '@/app/models/user.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import React, { useEffect } from 'react';
import { useAuth } from '../AuthProvider';
import AccountDeleteUserForm from './AccountDeleteUserForm';
import AccountEditEmailForm from './AccountEditEmailForm';
import AccountEditUsernameForm from './AccountEditUsernameForm';

const AccountPageSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='w-36 h-6' />
        <Skeleton className='w-96 h-5 '/>
      </CardHeader>
      <CardContent>
        <Skeleton className='w-64 h-5' />
      </CardContent>
      <CardFooter>
        <div className='flex justify-between items-center w-full'>
          <Skeleton className='w-72 h-5' />
          <Skeleton className='w-36 h-8' />
        </div>
      </CardFooter>
    </Card>
  );
}

const AccountPageContent = () => {

  const { user } = useAuth();

  return (
    <>
      {!user && Array.from({ length: 4 }).map((item, index) => (
        <AccountPageSkeleton key={index} />
      ))}
      {user &&
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
      }
    </>
  )
}

export default AccountPageContent