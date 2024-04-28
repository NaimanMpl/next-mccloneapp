'use client';
import Link from 'next/link';
import React from 'react';

const PlayButton = () => {
  return (
    <Link className='bg-neutral-50 px-12 py-3 rounded-md font-bold' href="/play">
      Jouer
    </Link>
  )
}

export default PlayButton