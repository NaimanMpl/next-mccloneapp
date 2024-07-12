'use client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import AccountDeleteUserForm from './AccountDeleteUserForm';
import AccountEditEmailForm from './AccountEditEmailForm';
import AccountEditProfileIcon from './AccountEditProfileIcon';
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

  const { data: session } = useSession();

  return (
    <>
      {!session && Array.from({ length: 4 }).map((item, index) => (
        <AccountPageSkeleton key={index} />
      ))}
      {session &&
      <>
        <AccountEditProfileIcon profileIconUrl={session.user.profileIconUrl} />
        <AccountEditUsernameForm username={session.user.name} />
        <AccountEditEmailForm email={session.user.email} />
        <AccountDeleteUserForm userId={session.user.id} />
      </>
      }
    </>
  )
}

export default AccountPageContent