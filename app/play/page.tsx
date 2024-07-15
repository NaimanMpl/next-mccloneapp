'use client';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Header from '../components/Header';
import Curve from '../components/layout/Curve';
import AnimatedShinyDiamondsText from '../components/play/AnimatedShinyDiamondsText';
import GradientTitle from '../components/ui/GradientTitle';

const PlayPage = () => {

  return (
    <div>
      <Header />
      <section className='px-20 mt-24'>
        <div className='flex flex-col items-center gap-6'>
          <AnimatedShinyDiamondsText />
          <div className='max-w-[60%]'>
            <GradientTitle className="mobile:text-left text-6xl">
              Un monde avec des possibilités infinies s'offre à vous.
            </GradientTitle>
          </div>
          <div className='max-w-[60%]'>
            <p className='text-lg font-medium text-center'>Pour certains, le rendez-vous en ligne avec d'autres joueurs c'était World of Warcraft, Counter Strike ou encore League of Legends. Mais pour nous, c'est Minecraft.</p>
          </div>
          <div className='flex items-center gap-2'>
            <Button>
              Télécharger pour Windows
            </Button>
            <Button className='flex items-center gap-1 border-none' variant='outline'>
              En savoir plus
              <ArrowRightIcon className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </section>
      <section>
        <div className='w-full mt-40 h-[40rem]'>
          <img className='rounded-lg w-full h-full object-cover' src="/play-bg.png" alt="Minecraft Clone Game Image" />
        </div>
      </section>
    </div>
  )
}

export default PlayPage