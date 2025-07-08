import * as React from 'react';
import { useLocation } from 'react-router';

import { NavMain } from '@/shadcn/components/AppSidebar/components/nav-main';
import { NavUser } from '@/shadcn/components/AppSidebar/components/nav-user';
import { WorkspaceSwitcher } from '@/shadcn/components/AppSidebar/components/workspace-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/shadcn/components/ui/sidebar';
import { useAuth } from '@/features/user/auth/hooks/useAuth';
import { useLogout } from '@/features/user/logout/hooks/useLogout';
import { menuData } from '@/config/data/appConfigData';
import { QuickActions } from './components/quick-actions';

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    userAuthQuery: { data: user },
  } = useAuth();

  const {
    logoutMutation: { mutate: logout },
  } = useLogout();

  const { isMobile, setOpenMobile, open } = useSidebar();
  const location = useLocation();

  // Close the sidebar on mobile when navigating
  // This effect closes the sidebar on mobile devices when the route changes.
  React.useEffect(() => {
    if (isMobile) setOpenMobile(false);

    // Cleanup: reset pointer events on body when the component unmounts or dependencies change.
    // Workaround for the body pointer-events bug of shadcn sidebar
    return () => {
      document.body.style.pointerEvents = '';
    };
  }, [location, isMobile, setOpenMobile]);

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <WorkspaceSwitcher workspaces={menuData.workspaces!} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuData.navMain} />
        <QuickActions isOpen={open} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={user!}
          logoutAction={logout}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
