import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import Header from '../components/Header';

const InConstruction = () => {
  return (
    <div className='h-screen'>
      <Header />
      <div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-40 flex-col items-center'>
        <h1 className='text-7xl font-semibold leading-none tracking-tight'>
          Oops !
        </h1>
        <h2 className='mt-4 text-4xl font-semibold leading-none tracking-tight'>
          Cette page est en cours de construction
        </h2>
        <p className='mt-2 text-lg text-muted-foreground'>
          Comme dans le jeu, je travaille dur pour construire quelque chose
          d'aussi incroyable que vous.
        </p>
        <Link href='/' className='mt-4'>
          <Button>Revenir à la page d'accueil</Button>
        </Link>
      </div>
    </div>
  );
};

export default InConstruction;
