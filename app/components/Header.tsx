'use client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import AccountInfo from './AccountInfo';
import { useAuth } from './AuthProvider';
import ToggleTheme from './header/ToggleTheme';

export const Header = () => {

  const { user, loading } = useAuth();

  return (
    <header className='flex items-center justify-between px-20 py-8'>
      <Link href='/'>
        <Image src='/logo.png' alt='Minecraft Clone' width='150' height='100' />
      </Link>
      <nav>
        <ul className='flex gap-6 items-center'>
          {loading
          &&
          <div className='flex items-center gap-2'>
            <Skeleton className='w-[30px] h-[30px] rounded-full' />
            <Skeleton className='w-24 h-4 rounded-full' />
          </div>
          }
          
          {!loading && user !== null
          &&
          <>
            <li><AccountInfo name={user.name} admin={user.admin} profileIconUrl={user.profileIconUrl} /></li>
          </>
          }

          {!loading && user === null && 
          <>
            <li>
              <Link className='font-medium' href='/register'>
                {"S'inscrire"}
              </Link>
            </li>
            <li>
              <Link href='/login'>
                <Button className='px-5'>
                  Se connecter
                </Button>
              </Link>
            </li>
          </>
          }
          <li>
            <ToggleTheme />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header