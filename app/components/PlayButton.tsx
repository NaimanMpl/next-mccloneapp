'use client';
import Link from 'next/link';
import React from 'react';

const PlayButton = () => {
  return (
    <Link className='bg-neutral-50 px-12 py-2 rounded-md font-bold text-black' href="/login">
      Jouer
    </Link>
  )
}

export default PlayButton