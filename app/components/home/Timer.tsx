'use client';
import React, { useEffect, useState } from 'react';
import Time from './Time';

interface TimerProps {
  initialDate: Date
}

const Timer = ({ initialDate }: TimerProps) => {

  const [ timer, setTimer ] = useState({
    diffInDays: 0,
    diffInHours: 0,
    diffInMinutes: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diffInMilliseconds = Math.abs(new Date().getTime() - initialDate.getTime());
      
      const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))
      const diffInHours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffInMinutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

      setTimer({
        diffInDays: diffInDays,
        diffInHours: diffInHours,
        diffInMinutes: diffInMinutes
      })
    }, 1000);

    return () => { clearInterval(interval) }
  });

  return (
    <div>
      <div className='flex gap-2 items-top'>
        <Time number={timer.diffInDays} subtitle='jours' />
        <span className='font-bold text-7xl'>:</span>
        <Time number={timer.diffInHours} subtitle='heures' />
        <span className='font-bold text-7xl'>:</span>
        <Time number={timer.diffInMinutes} subtitle='minutes' />
      </div>
    </div>
  )
}

export default Timer