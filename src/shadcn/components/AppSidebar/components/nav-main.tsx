import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/shadcn/components/ui/sidebar';
import type { MenuItem } from '@/config/interfaces/configInterfaces';
import { CollapsibleSidebarItem } from './collapsible-sidebar-item';
import { SimpleSidebarItem } from './simple-sidebar-item';

interface NavMainProps {
  items: MenuItem[];
}

export function NavMain({ items }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, idx) =>
          item.items?.length ? (
            <CollapsibleSidebarItem
              item={item}
              key={item.title}
              idx={idx}
            />
          ) : (
            <SimpleSidebarItem
              key={item.title}
              item={item}
              isMobile={false}
            />
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
