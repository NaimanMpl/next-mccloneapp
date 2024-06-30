'use client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const ToggleTheme = () => {

  const { theme, setTheme } = useTheme();

  return (
    <Button variant='outline' size='icon' onClick={() => { setTheme(theme === 'light' ? 'light' : 'light'); toast({ title: 'Désolé...', description: 'Je travaille encore sur le mode sombre !' }); }}>
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100' />
      <span className='sr-only'>Changer de thème</span>
    </Button>
  )
}

export default ToggleTheme