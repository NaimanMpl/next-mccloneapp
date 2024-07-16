import DashboardPageWrapper from '@/app/components/dashboard/DashboardPageWrapper';
import UsersTableContainer from '@/app/components/dashboard/UsersTableContainer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React from 'react';

const UsersPage = () => {
  return (
    <DashboardPageWrapper>
      <div className="px-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/dashboard'>Tableau de bord</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Utilisateurs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <UsersTableContainer />
      </div>
    </DashboardPageWrapper>
  )
}

export default UsersPage