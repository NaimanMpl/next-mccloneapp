import DashboardPageWrapper from '@/app/components/dashboard/DashboardPageWrapper';
import ServersTableContainer from '@/app/components/dashboard/servers/ServersTableContainer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const DashboardServersPage = () => {
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
              <BreadcrumbPage>Serveurs</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
          <ServersTableContainer />
        </Breadcrumb>
      </div>
    </DashboardPageWrapper>
  );
};

export default DashboardServersPage;
