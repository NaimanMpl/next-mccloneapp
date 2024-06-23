'use client';
import { useUsers } from '@/app/contexts/UsersContext';
import { RoleEnum } from '@/app/models/role.model';
import { User } from '@/app/models/user.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ListFilter, Plus, Search } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import UserRow from './UserRow';
import UserRowSkeleton from './UserRowSkeleton';
import AddUserDialog from './dialogs/AddUserDialog';

const UsersTable = () => {

  const { users, loading } = useUsers();
  const [ searchValue, setSearchValue ] = useState<string>('');
  const [ currentUsers, setCurrentUsers ] = useState<User[]>(users);

  const updateCurrentUsers = (value: string) => {
    if (!value || value.length === 0) {
      setCurrentUsers(users);
      return;
    }

    setCurrentUsers(users.filter(user => user.name.includes(value) || user.email.includes(value)));
  }

  const handleSearchChange: FormEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;

    setSearchValue(value);
    updateCurrentUsers(value);
  }

  useEffect(() => {
    updateCurrentUsers(searchValue);
  }, [users]);

  return (
    <div className='mt-8'>
      <Card>
        <CardHeader>
          <CardTitle>Utilisateurs</CardTitle>
          <CardDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, odio?
          </CardDescription>
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
              <AddUserDialog />
            </Dialog>
            <div className='relative lg:w-96'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input className='pl-8' placeholder='Rechercher' onChangeCapture={handleSearchChange} />
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
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Date de création
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
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
              {loading ? (
                Array.from({ length: 10 }).map((item, index) => (<UserRowSkeleton key={index} />))
              ) : (
                <>
                  {currentUsers.map(user => {
                    return (
                      <UserRow 
                        key={user.id} 
                        id={user.id} 
                        name={user.name} 
                        email={user.email} 
                        admin={user.admin} 
                        createdAt={user.createdAt}
                        role={user.role.name as RoleEnum}
                        profileIconUrl={user.profileIconUrl}
                      />
                    )
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export const UsersTableHead = () => {
  return (
    <TableRow>
      <TableHead>Utilisateur</TableHead>
      <TableHead>ID</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Date d'inscription</TableHead>
    </TableRow>
  )
}

export default UsersTable