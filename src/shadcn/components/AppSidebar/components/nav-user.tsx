import { ChevronsUpDown, User as UserIcon } from 'lucide-react';
import { Link, useLocation, type Location } from 'react-router';

import { Avatar } from '@/shadcn/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shadcn/components/ui/sidebar';
import { userMenuItems } from '@/config/data/appConfigData';
import type { User } from '@/features/user/interfaces/Auth';
import type { UserMenuItem } from '@/config/interfaces/configInterfaces';

// Helper to render user menu options grouped by 'group'
function renderUserMenuOptions({
  location,
  options,
  logoutAction,
}: {
  location: Location;
  options: UserMenuItem[];
  logoutAction: () => void;
}) {
  // Agrupar por grupo
  const groups = options.reduce<Record<string, typeof userMenuItems>>(
    (acc, opt) => {
      if (!acc[opt.group]) acc[opt.group] = [];
      acc[opt.group].push(opt);
      return acc;
    },
    {}
  );
  const groupKeys = Object.keys(groups);
  return groupKeys.map((group, idx) => (
    <div key={group}>
      <DropdownMenuGroup>
        {groups[group].map((opt) => (
          <DropdownMenuItem
            key={opt.title}
            asChild={!!opt.url}
            onClick={opt.group === 'logout' ? () => logoutAction() : undefined}
          >
            {opt.url ? (
              <Link
                to={opt.url}
                state={{ from: location.pathname }}
              >
                {opt.icon && <opt.icon />}
                {opt.title}
              </Link>
            ) : (
              <>
                {opt.icon && <opt.icon />}
                {opt.title}
              </>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
      {idx < groupKeys.length - 1 && (
        <DropdownMenuSeparator key={group + '-sep'} />
      )}
    </div>
  ));
}

export function NavUser({
  user,
  logoutAction,
}: {
  user: User;
  logoutAction: () => void;
}) {
  const { isMobile } = useSidebar();
  const location = useLocation();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 flex items-center justify-center rounded-lg">
                <UserIcon />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.email.split('@')[0]}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 flex items-center justify-center rounded-lg">
                  <UserIcon />
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.email.split('@')[0]}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {renderUserMenuOptions({
              location,
              options: userMenuItems,
              logoutAction,
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
