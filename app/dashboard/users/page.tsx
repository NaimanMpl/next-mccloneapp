import DashboardPageWrapper from '@/app/components/dashboard/DashboardPageWrapper';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React from 'react';
import Header from '../../components/Header';
import UsersTable from '../../components/dashboard/UsersTable';

const UsersPage = () => {
  return (
    <DashboardPageWrapper>
      <div className="px-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Utilisateurs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <UsersTable />
      </div>
    </DashboardPageWrapper>
  )
}

export default UsersPage