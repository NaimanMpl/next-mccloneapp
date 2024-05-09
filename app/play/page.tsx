import React from 'react'
import Header from '../components/Header'
import Curve from '../components/layout/Curve'

const PlayPage = () => {
  return (
      <video src='/hero.mp4' className="h-full w-full float-left top-0 p-0 fixed" autoPlay muted loop >
      </video>
  )
}

export default PlayPage