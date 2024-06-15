import { RoleEnum } from '@/app/models/role.model'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import EditUserDialog from './EditUserDialog'
import RoleBadge from './RoleBadge'

interface UserRowProps {
  id: string,
  name: string,
  email: string,
  role: RoleEnum,
  admin: boolean,
  createdAt: Date
}

const UserRow = ({ id, name, email, role, admin, createdAt }: UserRowProps) => {

  return (
    <TableRow className='cursor-pointer'>
      <TableCell>
        <div className='flex gap-4'>
          <Image className='rounded w-10' src='/default-pp.png' alt='Minecraft Clone' width='150' height='100' />
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
      <Dialog>
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
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    Éditer
                  </DropdownMenuItem>
                </DialogTrigger>
              <DropdownMenuItem className='flex gap-2'>
                <span className='text-destructive'>Supprimer</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <EditUserDialog id={id} userRole={role} name={name} email={email} admin={admin} />
        </TableCell>
      </Dialog>
    </TableRow>
  )
}

export default UserRow