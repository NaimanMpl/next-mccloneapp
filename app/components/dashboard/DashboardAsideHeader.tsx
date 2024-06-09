'use client';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const DashboardAsideHeader = () => {
  return (
    <aside className='fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r border-border bg-background sm:flex'>
      <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
               href='/dashboard'
               className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
              >
                <Home className='w-5 h-5' />
                <span className='sr-only'>Dashboard</span>
              </Link>  
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}

export default DashboardAsideHeader