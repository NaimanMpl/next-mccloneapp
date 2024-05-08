'use client';
import React, { useEffect, useState } from 'react';
import Time from './Time';

interface TimerProps {
  initialDate: Date
}

const calculateDateDifference = (date: Date) => {
  const diffInMilliseconds = Math.abs(new Date().getTime() - date.getTime());
      
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24))
  const diffInHours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffInMinutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const diffInSeconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

  return {
    diffInDays: diffInDays,
    diffInHours: diffInHours,
    diffInMinutes: diffInMinutes,
    diffInSeconds: diffInSeconds
  }
}

const Timer = ({ initialDate }: TimerProps) => {

  const [ timer, setTimer ] = useState(calculateDateDifference(initialDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(calculateDateDifference(initialDate))
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