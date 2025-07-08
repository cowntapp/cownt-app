import { Link } from 'react-router';
import { Button } from '../../ui/button';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '../../ui/sidebar';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { DollarSign } from 'lucide-react';

interface QuickActionsProps {
  isOpen: boolean;
}

export const QuickActions = ({ isOpen }: QuickActionsProps) => {
  const workspace = useRouterParams('workspace').workspace as AnimalPath;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Accions Ràpides</SidebarGroupLabel>
      <SidebarGroupContent>
        <Button
          asChild
          className="w-full"
          size={isOpen ? 'default' : 'sm'}
        >
          <Link to={`/${workspace}/new?origin=bought`}>
            {isOpen ? 'Nova Compra' : <DollarSign />}
          </Link>
        </Button>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
