import { Button } from '@/components/ui/button';
import React, { MouseEventHandler } from 'react';

const ChangeUsernameButton = () => {

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

  }

  return (
    <Button onClick={handleClick}>Sauvegarder</Button>
  )
}

export default ChangeUsernameButton