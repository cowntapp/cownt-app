import { type EntityKey } from '@/config/interfaces/configInterfaces';
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
  useSidebar,
} from '@/shadcn/components/ui/sidebar';
import {
  i18n_actions,
  i18n_entities,
  type AppAction,
} from '@/shared/translations/translations';
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
        <MainContent />
      </SidebarInset>
    </SidebarProvider>
  );
}

// Workaround to fix table overflowing viewport
function MainContent() {
  const { isMobile, sidebarWidth } = useSidebar();

  return (
    <div
      className="flex flex-1 flex-col gap-4 p-4 pt-0"
      style={
        !isMobile
          ? {
              maxWidth: `calc(100vw - ${sidebarWidth} - 16px)`,
            }
          : {}
      }
    >
      <Outlet />
    </div>
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
              {/* TODO: fix buggy view in small viewport width */}
              {idx !== 0 && <BreadcrumbSeparator className="hidden md:block" />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {i18n_entities[segment as EntityKey] ??
                      i18n_actions[segment as AppAction] ??
                      formatStringSegment(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>
                      {i18n_entities[segment as EntityKey] ??
                        i18n_actions[segment as AppAction] ??
                        formatStringSegment(segment)}
                    </Link>
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

function formatStringSegment(segment: string) {
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}
