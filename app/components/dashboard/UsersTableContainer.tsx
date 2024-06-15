'use client';
import { UsersProvider } from '@/app/contexts/UsersContext';
import React from 'react';
import UsersTable from './UsersTable';

const UsersTableContainer = () => {
  return (
    <UsersProvider>
      <UsersTable />
    </UsersProvider>
  )
}

export default UsersTableContainer