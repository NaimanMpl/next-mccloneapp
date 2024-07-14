'use client';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import React from 'react';
import Header from '../components/Header';
import Curve from '../components/layout/Curve';
import GradientTitle from '../components/ui/GradientTitle';

const PlayPage = () => {

  return (
    <div>
      <Header />
      <section className='px-20 mt-40'>
        <div className='flex flex-col items-center'>
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}
            onClick={() => toast({ title: 'Succès obtenu', description: 'DIAMONDS!'})}
          >
            <AnimatedShinyText 
              className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
            >
              <span>✨ DIAMONDS!</span>
            </AnimatedShinyText>
          </div>
          <div className='max-w-[60%] mt-4'>
            <GradientTitle className="mobile:text-left">
              Un monde avec des possibilités infinies s'offre à vous.
            </GradientTitle>
          </div>
          <div className='flex items-center gap-4'>
            <Button className='h-fit mt-10'>
              <img className='w-4 h-4 mr-1' src="/windows-icon.svg" alt="Windows" />
              Télécharger pour Windows
            </Button>
            <Button>
              En savoir plus
            </Button>
          </div>
        </div>
        <div className='w-full mt-40 h-[40rem]'>
          <img className='rounded-lg w-full h-full object-cover' src="/play-bg.png" alt="Minecraft Clone Game Image" />
        </div>
      </section>
    </div>
  )
}

export default PlayPage