import { isAnimalPath } from '@/features/animals/interfaces/animalType';
import { EditOwnerForm } from '@/features/animals/owners/components/Forms/EditOwnerForm';
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
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link, Navigate } from 'react-router';

export const EditOwner = () => {
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
            <span>Torna a Propietaris</span>
          </Link>
        </Button>
        <Separator
          orientation="vertical"
          className="mr-4"
        />
        <TypoLead>Propietaris</TypoLead>
      </header>

      <TypoH1>Edita Propietari</TypoH1>

      <Alert variant={'destructive'}>
        <AlertTriangle />
        <AlertTitle>Acció Perillosa</AlertTitle>
        <AlertDescription>
          Si actualitzes aquest Propietari, tots els animals amb aquest
          Propietari també es modificaran
        </AlertDescription>
      </Alert>

      <EditOwnerForm animalType={workspace} />
    </div>
  );
};
