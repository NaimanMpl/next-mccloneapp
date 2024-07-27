import DashboardPageWrapper from '@/app/components/dashboard/DashboardPageWrapper';
import DashboardRolesContainer from '@/app/components/dashboard/roles/DashboardGroupsContainer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React from 'react';

const DashboardGroupPage = () => {
  return (
    <DashboardPageWrapper>
      <div className='px-20'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/dashboard'>Tableau de bord</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Roles</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <DashboardRolesContainer />
      </div>
    </DashboardPageWrapper>
  );
};

export default DashboardGroupPage;
