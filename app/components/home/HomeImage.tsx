import React from 'react'

interface HomeImageProps {
  src: string,
  alt: string,
  className?: string
}

const HomeImage = ({ src, alt, className }: HomeImageProps) => {
  return (
    <img className={`w-full object-cover ${className}`} src={src} alt={alt} />
  )
}

export default HomeImage