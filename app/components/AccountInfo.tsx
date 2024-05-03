'use client';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import { AuthContext, useAuth } from './AuthProvider';

const AccountInfo = () => {

  const { user, loggedIn } = useContext(AuthContext);

  return (
    <>
      {user != null && 
        <div className='flex gap-2 items-center'>
          <Image className='rounded-full' width='30' height='30' src='/default-pp.png' alt='Profile Icon' />
          <span>{user.name}</span>
        </div>
      }
    </>
  )
}

export default AccountInfo