'use client';

import { useSession } from 'next-auth/react';
import AccountDeleteUserForm from './AccountDeleteUserForm';
import AccountEditEmailForm from './AccountEditEmailForm';
import AccountEditProfileIcon from './AccountEditProfileIcon';
import AccountEditUsernameForm from './AccountEditUsernameForm';
import AccountPageSkeleton from './AccountPageSkeleton';

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