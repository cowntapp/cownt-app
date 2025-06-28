import type { EntityKey } from '@/config/interfaces/configInterfaces';
import { AppSidebar } from '@/shadcn/components/AppSidebar/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shadcn/components/ui/breadcrumb';
import { Separator } from '@/shadcn/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shadcn/components/ui/sidebar';
import { entities } from '@/shared/translations/translations';
import { Outlet, useLocation, Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';

export default function DashboardLayout() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <BreadcrumbComponent pathnames={pathnames} />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function BreadcrumbComponent({ pathnames }: { pathnames: string[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnames.map((segment, idx) => {
          const to = '/' + pathnames.slice(0, idx + 1).join('/');
          const isLast = idx === pathnames.length - 1;
          return (
            <Fragment key={to}>
              {idx !== 0 && <BreadcrumbSeparator className="hidden md:block" />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {entities[segment as EntityKey]}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>{entities[segment as EntityKey]}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
