'use client';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import React from 'react';

const AnimatedShinyDiamondsText = () => {
  return (
    <div
      className={cn(
        "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
      )}
      onClick={() => toast({ title: 'Succès obtenu', description: '✨ DIAMONDS!'})}
    >
      <AnimatedShinyText 
        className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
      >
        <span>✨ DIAMONDS!</span>
      </AnimatedShinyText>
    </div>
  )
}

export default AnimatedShinyDiamondsText