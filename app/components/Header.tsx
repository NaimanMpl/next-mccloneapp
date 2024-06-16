import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { UserPayload } from '../models/user.model';
import AccountInfo from './AccountInfo';
import ToggleTheme from './header/ToggleTheme';

async function Header() {

  const res = await fetch('http://localhost:3000/api/auth/me', 
  { 
    method: 'GET', 
    headers: { Cookie: cookies().toString() }
  });

  const user: UserPayload | null = res.ok ? await res.json() : null;

  return (
    <header className='flex items-center justify-between px-20 py-8'>
      <Link href='/'>
        <Image src='/logo.png' alt='Minecraft Clone' width='150' height='100' />
      </Link>
      <nav>
        <ul className='flex gap-6 items-center'>
          <li>
            <Link className='font-medium' href="/about">
              A propos
            </Link>
          </li>
          {user != null && <li><AccountInfo name={user.name} admin={user.admin} /></li>}
          {user == null && 
          <>
            <li>
              <Link className='font-medium' href='/register'>
                {"S'inscrire"}
              </Link>
            </li>
            <li>
              <Link className='bg-neutral-50 py-2 text-black font-semibold px-6 rounded-md' href='/login'>
                Se connecter
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