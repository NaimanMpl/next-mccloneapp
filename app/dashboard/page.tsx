import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React, { Suspense } from 'react';
import DashboardContent from '../components/dashboard/DashboardContent';
import DashboardPageWrapper from '../components/dashboard/DashboardPageWrapper';

const DashboardPage = () => {
  return (
    <DashboardPageWrapper>
      <div className='px-20'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Tableau de bord</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <DashboardContent />
      </div>
    </DashboardPageWrapper>
  );
};

export default DashboardPage;
