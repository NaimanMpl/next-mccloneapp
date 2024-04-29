import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import PlayButton from './PlayButton'

const Header = () => {
  return (
    <header className='flex justify-between px-20 py-8'>
      <Image src='/logo.png' alt='Minecraft Clone' width='150' height='100' />
      <nav>
        <ul className='flex gap-8 text-neutral-50'>
          <li><Link href="/about">A propos</Link></li>
          <li><PlayButton /></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header