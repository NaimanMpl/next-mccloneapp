'use client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AccountInfo from './AccountInfo';
import ToggleTheme from './header/ToggleTheme';

export const Header = () => {

  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const authenticated = status === 'authenticated';

  return (
    <header className='flex items-center justify-between border-b border-border px-20 py-6 mobile:px-10 mobile:py-4'>
      <Link href='/'>
        <img src="/logo.png" alt="Minecraft Clone" className='w-[150px] mobile:w-24' />
      </Link>
      <nav>
        <ul className='flex gap-6 items-center mobile:gap-4'>
          {loading
          &&
          <div className='flex items-center gap-2'>
            <Skeleton className='w-[30px] h-[30px] rounded-full' />
            <Skeleton className='w-24 h-4 rounded-full' />
          </div>
          }
          
          {!loading && authenticated && session.user &&
          <>
            <li><AccountInfo name={session.user.name} admin={session.user.admin} profileIconUrl={session.user.profileIconUrl} /></li>
          </>
          }

          {!loading && !authenticated &&
          <>
            <li>
              <Link className='font-medium mobile:hidden' href='/register'>
                S'inscrire
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

export default Header;