import { RoleEnum } from '@/app/models/role.model'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import RoleBadge from './RoleBadge'
import DeleteUserDialog from './dialogs/DeleteUserDialog'
import EditUserDialog from './dialogs/EditUserDialog'

interface UserRowProps {
  id: string,
  name: string,
  email: string,
  role: RoleEnum,
  admin: boolean,
  profileIconUrl: string,
  createdAt: Date
}

const UserRow = ({ id, name, email, role, admin, profileIconUrl, createdAt }: UserRowProps) => {

  const [ isEditDialogOpen, setIsEditDialogOpen ] = useState(false);
  const [ isDeleteDialogOpen, setIsDeleteDialogOpen ] = useState(false);

  return (
    <TableRow className='cursor-pointer'>
      <TableCell>
        <div className='flex gap-4'>
          <img className='w-10 h-10 rounded' src={profileIconUrl} alt={name} />
          <div>
            <p className='font-semibold'>{name}</p>
            <p className='text-muted-foreground'>{email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p>{id}</p>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <RoleBadge role={role} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Badge variant={role !== 'Administrateur' ? 'destructive' : 'secondary'}>
                {role === 'Joueur' ? 'Administrateur' : 'Joueur'}
              </Badge>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      <TableCell>
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
              Éditer
            </DropdownMenuItem>
            <DropdownMenuItem disabled={admin} onClick={() => setIsDeleteDialogOpen(true)} className='text-destructive'>
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog 
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        >
          <EditUserDialog id={id} userRole={role} name={name} email={email} admin={admin} />
        </Dialog>
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <DeleteUserDialog userId={id} username={name} />
        </AlertDialog>
      </TableCell>
    </TableRow>
  )
}

export default UserRow