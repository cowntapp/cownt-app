import type { MenuItem } from '@/config/interfaces/configInterfaces';
import { SidebarMenuItem, SidebarMenuButton } from '../../ui/sidebar';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { Link } from 'react-router';

export function SimpleSidebarItem({ item }: { item: MenuItem }) {
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
    </SidebarMenuItem>
  );
}
