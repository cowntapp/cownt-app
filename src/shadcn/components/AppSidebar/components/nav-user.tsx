import { ChevronsUpDown, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router';

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
import { userMenuOptions, type UserMenuOption } from '@/config/appConfig';
import type { User } from '@/features/auth/interfaces/Auth';

// Helper to render user menu options grouped by 'group'
function renderUserMenuOptions(
  options: UserMenuOption[],
  logoutAction: () => void
) {
  // Agrupar por grupo
  const groups = options.reduce<Record<string, typeof userMenuOptions>>(
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
            key={opt.label}
            asChild={!!opt.route}
            onClick={opt.group === 'logout' ? () => logoutAction() : undefined}
          >
            {opt.route ? (
              <Link to={opt.route}>
                <opt.icon />
                {opt.label}
              </Link>
            ) : (
              <>
                <opt.icon />
                {opt.label}
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
            {renderUserMenuOptions(userMenuOptions, logoutAction)}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
