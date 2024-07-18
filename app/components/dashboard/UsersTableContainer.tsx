'use client';
import { UsersProvider } from '@/app/contexts/UsersContext';
import React, { Suspense } from 'react';
import UsersTable from './UsersTable';

const UsersTableContainer = () => {
  return (
    <Suspense>
      <UsersProvider>
        <UsersTable />
      </UsersProvider>
    </Suspense>
  )
}

export default UsersTableContainer