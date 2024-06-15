import DashboardPageWrapper from '@/app/components/dashboard/DashboardPageWrapper'
import RolePageContent from '@/app/components/dashboard/roles/RolePageContent'
import { RoleEnum } from '@/app/models/role.model'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { upperFirstLetter } from '@/lib/utils'
import React from 'react'

const RolePage = ({ params }: { params: { role: string }}) => {
  const roleName = upperFirstLetter(params.role);
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
              <BreadcrumbLink href='/dashboard/roles'>Roles</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{roleName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-8">
          <RolePageContent roleName={roleName as RoleEnum} />
        </div>
      </div>
    </DashboardPageWrapper>
  )
}

export default RolePage