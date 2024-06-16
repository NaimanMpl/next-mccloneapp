'use client';
import { RolesProvider } from '@/app/contexts/RolesContext';
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
      <RolesProvider>
        <RolesUsersTable roleName={roleName} />
      </RolesProvider>
    </UsersProvider>
  )
}

export default RolePageContent