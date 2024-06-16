'use client';
import { useUsers } from '@/app/contexts/UsersContext';
import { deleteUser } from '@/app/services/userservice';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import React, { MouseEventHandler } from 'react';

interface DeleteUserDialogProps {
  userId: string,
  username: string
}

const DeleteUserDialog = ({ userId, username }: DeleteUserDialogProps) => {

  const { setUsers } = useUsers();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      const deletedUser = await deleteUser(userId);
      setUsers(users => users.filter(user => user.id !== deletedUser.id));
      toast({ title: 'Succès', description: `C'est une fin de carrière pour ${deletedUser.name}...`, variant: 'default' });
    } catch (e) {
      const message = (e as Error).message;
      toast({ title: 'Uh-oh', description: message, variant: 'destructive' });
    }
  } 

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Etes vous sur de vouloir mettre fin à la carrière de {username}?</DialogTitle>
        <DialogDescription>
          Cette action est irréversible. Le compte ne pourra être restauré et sera supprimé définitivement.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant='outline'>Annuler</Button>
        <Button variant='destructive' onClick={handleSubmit}>Supprimer</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default DeleteUserDialog