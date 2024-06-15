import { useUsers } from '@/app/contexts/UsersContext'
import { RoleEnum } from '@/app/models/role.model'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableHeader } from '@/components/ui/table'
import { ListFilter, Plus, Search } from 'lucide-react'
import React from 'react'
import UserRow from '../UserRow'
import { UsersTableHead } from '../UsersTable'

interface RolesUsersTable {
  roleName: string
}

const RolesUsersTable = ({ roleName }: RolesUsersTable) => {

  const { users } = useUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{roleName}</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, unde.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex justify-end gap-2 pb-4'>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='mr-auto flex gap-2'>
                <Plus className='w-5 h-5' />
                Ajouter un utilisateur
              </Button>
            </DialogTrigger>
          </Dialog>
          <div className='relative lg:w-96'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input className='pl-8' placeholder='Rechercher' />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className='gap-1 text-sm'
              >
                <ListFilter className='h-3.5 w-3.5' />
                <span>Filtrer</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked>
                Nom
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            <UsersTableHead />
          </TableHeader>
          <TableBody>
            {users.filter(user => user.role.name === roleName).map(user => {
              return (
                <UserRow
                  key={user.id} 
                  id={user.id} 
                  name={user.name} 
                  email={user.email} 
                  admin={user.admin} 
                  createdAt={user.createdAt}
                  role={roleName as RoleEnum} 
              />
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default RolesUsersTable