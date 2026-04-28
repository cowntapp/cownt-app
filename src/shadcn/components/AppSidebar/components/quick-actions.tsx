import { DollarSign, ListIcon } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '../../ui/sidebar';

import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { Button } from '../../ui/button';
import { Link } from 'react-router';
import { useRouterParams } from '@/shared/hooks/useRouterParams';

interface QuickActionsProps {
  isOpen: boolean;
}

export const QuickActions = ({ isOpen }: QuickActionsProps) => {
  const workspace = useRouterParams('workspace').workspace as AnimalPath;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Accions Ràpides</SidebarGroupLabel>
      <SidebarGroupContent className="space-y-2">
        <Button
          asChild
          className="w-full"
          size={isOpen ? 'default' : 'sm'}
        >
          <Link to={`/${workspace}/new?origin=bought`}>
            {isOpen ? 'Nova Compra' : <DollarSign />}
          </Link>
        </Button>
        <Button
          asChild
          className="w-full"
          size={isOpen ? 'default' : 'sm'}
          variant={'secondary'}
        >
          <Link to={`/${workspace}/list`}>
            {isOpen ? 'Descarrega Llista' : <ListIcon />}
          </Link>
        </Button>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
