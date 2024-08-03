import { useDeleteServerMutation } from '@/app/api/slice';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import React, { MouseEventHandler, useEffect } from 'react';

interface DeleteServerDialogProps {
  serverId: number;
}

const DeleteServerDialog = ({ serverId }: DeleteServerDialogProps) => {
  const [ deleteServer, { data, isLoading, error }] = useDeleteServerMutation();
  
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    void deleteServer({id: serverId});
  }

  useEffect(() => {
    if (error) {
      toast({ title: 'Uh-oh', description: 'Le serveur a rencontré un problème.', variant: 'destructive'});
      return;
    }
    if (data) {
      toast({ title: "Ce n'est qu'un au-revoir...", description: 'Le serveur a été supprimé ave succès.'});
      return;
    }
  }, [data, error]);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
        <AlertDialogDescription>Cette action est irréversible et supprimera définitivement le serveur.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading && <Loader2 className='mr-2 w-5 h-5 animate-spin' />}
          Supprimer
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

export default DeleteServerDialog