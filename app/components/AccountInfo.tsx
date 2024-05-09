'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { AuthContext, useAuth } from './AuthProvider';

const AccountInfo = () => {

  const { user, loggedIn } = useContext(AuthContext);

  return (
    <>
      {user != null && 
        <div className='flex gap-2 items-center'>
          <Image className='rounded-full' width='30' height='30' src='/default-pp.png' alt='Profile Icon' />
          <Link href='/dashboard'>{user.name}</Link>
        </div>
      }
    </>
  )
}

export default AccountInfo