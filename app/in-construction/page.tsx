import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Header from '../components/Header'

const InConstruction = () => {
  return (
    <div className='h-screen'>
      <Header />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-40 flex flex-col items-center">
        <h1 className='font-semibold text-7xl tracking-tight leading-none'>Oops !</h1>
        <h2 className='font-semibold text-4xl tracking-tight leading-none mt-4'>Cette page est en cours de construction</h2>
        <p className='text-muted-foreground text-lg mt-2'>Comme dans le jeu, je travaille dur pour construire quelque chose d'aussi incroyable que vous.</p>
        <Link href='/' className='mt-4'>
          <Button>Revenir à la page d'accueil</Button>
        </Link>
      </div>
    </div>
  )
}

export default InConstruction