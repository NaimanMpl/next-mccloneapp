'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

const DashboardUserCard = () => {

  const { user, loggedIn } = useContext(AuthContext);

  return (
    <div className='flex gap-5 items-center mt-10'>
      <Image className='rounded-full' src='/default-pp.png' alt='Profile Icon' width='100' height='100' />
      <div className='flex flex-col'>
        <span className='text-2xl font-bold'>{user.name}</span>
        <span className='text-gray'>Utilisateur</span>
        <span className='text-gray'>France</span>
      </div>
    </div>
  )
}

export default DashboardUserCard