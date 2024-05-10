import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { AuthContext, useAuth } from './AuthProvider';

interface AccountInfoProps {
  name: string,
}

const AccountInfo = ({ name }: AccountInfoProps) => {

  return (
    <>
      <div className='flex gap-2 items-center'>
        <Image className='rounded-full' width='30' height='30' src='/default-pp.png' alt='Profile Icon' />
        <Link className='font-semibold' href='/account'>{name}</Link>
      </div>
    </>
  )
}

export default AccountInfo