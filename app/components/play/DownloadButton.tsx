'use client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import React from 'react';

const DownloadButton = () => {
  return (
    <Button
      onClickCapture={() => { toast({ title: 'Oops', description: 'Le jeu est disponible uniquement sur GitHub pour le moment !'})}}
    >
      Télécharger pour Windows
    </Button>
  )
}

export default DownloadButton