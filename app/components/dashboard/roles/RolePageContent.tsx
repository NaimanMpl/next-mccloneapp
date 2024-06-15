'use client';
import { UsersProvider } from '@/app/contexts/UsersContext';
import { RoleEnum } from '@/app/models/role.model';
import React from 'react';
import RolesUsersTable from './RolesUsersTable';

interface RolePageContent {
  roleName: RoleEnum
}

const RolePageContent = ({ roleName }: RolePageContent) => {
  return (
    <UsersProvider>
      <RolesUsersTable roleName={roleName} />
    </UsersProvider>
  )
}

export default RolePageContent