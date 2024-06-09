'use client';
import { getUsers } from '@/app/services/userservice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import UserRow from './UserRow';

const UsersTable = () => {

  const [ users, setUsers ] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      console.log(users);
      setUsers(users);
    }


    fetchUsers();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Utilisateurs</CardTitle>
          <CardDescription>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, odio?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <UsersTableHead />
            </TableHeader>
            <TableBody>
              {users.map(user => {
                return <UserRow key={user.id} id={user.id} name={user.name} email={user.email} admin={user.admin} createdAt={user.createdAt} role={user.role.name} />
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

const UsersTableHead = () => {
  return (
    <TableRow>
      <TableHead>Utilisateur</TableHead>
      <TableHead>ID</TableHead>
      <TableHead>Role</TableHead>
      <TableHead>Administrateur du site</TableHead>
      <TableHead>Date d'inscription</TableHead>
    </TableRow>
  )
}

export default UsersTable