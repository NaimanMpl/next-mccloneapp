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
import DownloadButton from '../components/play/DownloadButton';
import GradientTitle from '../components/ui/GradientTitle';

const PlayPage = () => {

  return (
    <div>
      <Header />
      <section className='relative px-20 mt-24'>
        <img className='absolute -left-16 top-1/2 -translate-y-1/2 w-52 rotate-12' src="/crafting-table.webp" alt="Crafting Table" />
        <img className='absolute -right-16 top-1/2 -translate-y-1/2 w-52 -rotate-12 scale-x-[-1]' src="/furnace.webp" alt="Furnace" />
        <div className='flex flex-col items-center gap-6'>
          <AnimatedShinyDiamondsText />
          <div className='relative max-w-[60%]'>
            <img className='absolute right-0 -top-8 w-12 h-12 rotate-12' src="/heart-doodle.svg" alt="♥" />
            <GradientTitle className="mobile:text-left text-6xl">
              Un monde avec des possibilités infinies s'offre à vous.
            </GradientTitle>
          </div>
          <div className='max-w-[60%]'>
            <p className='text-lg font-medium text-center'>Pour certains, le rendez-vous en ligne avec d'autres joueurs c'était World of Warcraft, Counter Strike ou encore League of Legends. Mais pour nous, c'est Minecraft.</p>
          </div>
          <div className='flex items-center gap-2'>
            <DownloadButton />
            <Button className='flex items-center gap-1 border-none' variant='outline'>
              En savoir plus
              <ArrowRightIcon className='w-4 h-4' />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PlayPage