import type { EntityKey } from '@/config/interfaces/configInterfaces';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { Badge } from '@/shadcn/components/ui/badge';
import { Button } from '@/shadcn/components/ui/button';
import { Separator } from '@/shadcn/components/ui/separator';
import { i18n_entities } from '@/shared/translations/translations';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

interface AnimalHeaderProps {
  workspace: string;
  animalCode: string;
}

export const AnimalHeader = ({ workspace, animalCode }: AnimalHeaderProps) => {
  return (
    <header className="h-16 flex items-center gap-x-4">
      <Button
        asChild
        variant={'link'}
      >
        <Link to={`/${workspace}`}>
          <ArrowLeft />
          <span>Tornar a la llista</span>
        </Link>
      </Button>
      <Separator
        orientation="vertical"
        className="data-[orientation=vertical]:h-6"
      />
      <Badge className="font-mono">{animalCode}</Badge>
      <TypoLead asChild>
        <h1>{i18n_entities[workspace.slice(0, -1) as EntityKey]}</h1>
      </TypoLead>
    </header>
  );
};
