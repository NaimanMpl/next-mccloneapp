'use client';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

const ToggleTheme = () => {

  const { theme, setTheme } = useTheme();

  return (
    <Button variant='outline' size='icon' onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light') }}>
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100' />
      <span className='sr-only'>Changer de thème</span>
    </Button>
  )
}

export default ToggleTheme