import type { MenuItem } from '@/config/interfaces/configInterfaces';
import { MoreHorizontal, Folder, Forward, Trash2 } from 'lucide-react';
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from '../../ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { Link } from 'react-router';

export function SimpleSidebarItem({
  item,
  isMobile,
}: {
  item: MenuItem;
  isMobile: boolean;
}) {
  const { workspace } = useRouterParams('workspace');

  const formatUrl = (url: string) => {
    return url.replace(':animal', workspace);
  };

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        {item.url && (
          <Link to={formatUrl(item.url!)}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        )}
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 rounded-lg"
          side={isMobile ? 'bottom' : 'right'}
          align={isMobile ? 'end' : 'start'}
        >
          <DropdownMenuItem>
            <Folder className="text-muted-foreground" />
            <span>View Project</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Forward className="text-muted-foreground" />
            <span>Share Project</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Trash2 className="text-muted-foreground" />
            <span>Delete Project</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
