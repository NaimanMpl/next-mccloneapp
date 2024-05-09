import Link from 'next/link';
import React from 'react';

interface PlayButtonProps {
  background: string,
  color: string,
}

const PlayButton = ({ background, color }: PlayButtonProps) => {
  return (
    <Link className={`bg-${background} px-12 py-2 rounded-md font-bold text-${color}`} href="/play">
      Jouer
    </Link>
  )
}

export default PlayButton