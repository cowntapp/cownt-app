import { EditBreedForm } from '@/features/animals/breeds/components/Forms/EditBreedForm';
import { isAnimalPath } from '@/features/animals/interfaces/animalType';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shadcn/components/ui/alert';
import { Button } from '@/shadcn/components/ui/button';
import { Separator } from '@/shadcn/components/ui/separator';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { i18n_entities } from '@/shared/translations/translations';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link, Navigate } from 'react-router';

export const EditBreed = () => {
  const { workspace } = useRouterParams('workspace');
  const isValidWorkspace = isAnimalPath(workspace);
  if (!isValidWorkspace) {
    return (
      <Navigate
        to={'/not-found'}
        replace
      />
    );
  }
  return (
    <div className="flex flex-col gap-y-8 max-w-xl">
      <header className="flex items-center gapx2">
        <Button
          asChild
          variant={'link'}
        >
          <Link to={'..'}>
            <ArrowLeft />
            <span>Torna a Races</span>
          </Link>
        </Button>
        <Separator
          orientation="vertical"
          className="mr-4"
        />
        <TypoLead>Races {i18n_entities[workspace]}</TypoLead>
      </header>

      <TypoH1>Edita Raça</TypoH1>

      <Alert variant={'destructive'}>
        <AlertTriangle />
        <AlertTitle>Acció Perillosa</AlertTitle>
        <AlertDescription>
          Si actualitzes aquesta Raça, tots els animals amb aquesta Raça també
          es modificaran
        </AlertDescription>
      </Alert>

      <EditBreedForm animalType={workspace} />
    </div>
  );
};
