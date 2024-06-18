import React from 'react'

interface HomeImageProps {
  src: string,
  alt: string
}

const HomeImage = ({ src, alt }: HomeImageProps) => {
  return (
    <img className='w-full object-cover' src={src} alt={alt} />
  )
}

export default HomeImage