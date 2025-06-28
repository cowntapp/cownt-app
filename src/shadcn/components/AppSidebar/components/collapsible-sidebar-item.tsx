import type { MenuItem } from '@/config/interfaces/configInterfaces';
import { ChevronRight } from 'lucide-react';
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '../../ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../ui/collapsible';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { Link } from 'react-router';

export function CollapsibleSidebarItem({
  item,
  idx,
}: {
  item: MenuItem;
  idx: number;
}) {
  const { workspace } = useRouterParams('workspace');

  const formatUrl = (url: string) => {
    return url.replace(':animal', workspace);
  };

  return (
    <Collapsible
      key={item.title}
      asChild
      // TODO: Check how to make it default open depending on the route
      defaultOpen={idx === 0}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  {subItem.url && (
                    <Link to={formatUrl(subItem.url!)}>
                      <span>{subItem.title}</span>
                    </Link>
                  )}
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
