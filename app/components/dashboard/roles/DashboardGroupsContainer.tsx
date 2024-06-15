'use client';
import { RolesProvider } from '@/app/contexts/RolesContext';
import React from 'react';
import RolesGrid from './RolesGrid';

const DashboardRolesContainer = () => {
  return (
  <RolesProvider>
    <RolesGrid />
  </RolesProvider>
  )
}

export default DashboardRolesContainer