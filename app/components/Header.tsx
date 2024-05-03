import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { UserPayload } from '../models/user.model'
import { getCurrentUser } from '../services/authservice'
import AccountInfo from './AccountInfo'
import PlayButton from './PlayButton'

const Header = async () => {

  return (
    <header className='flex items-center justify-between px-20 py-8'>
      <Image src='/logo.png' alt='Minecraft Clone' width='150' height='100' />
      <nav>
        <ul className='flex gap-8 text-neutral-50'>
          <li><Link href="/about">A propos</Link></li>
          <li><AccountInfo /></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header