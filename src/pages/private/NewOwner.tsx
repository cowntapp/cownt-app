import { isAnimalPath } from '@/features/animals/interfaces/animalType';
import { CreateOwnerForm } from '@/features/animals/owners/components/Forms/CreateOwnerForm';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { Button } from '@/shadcn/components/ui/button';
import { Separator } from '@/shadcn/components/ui/separator';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { ArrowLeft } from 'lucide-react';
import { Link, Navigate } from 'react-router';

export const NewOwner = () => {
  const { workspace } = useRouterParams('workspace');
  const isValidWorkspace = isAnimalPath(workspace);
  if (!isValidWorkspace)
    return (
      <Navigate
        to={'/not-found'}
        replace
      />
    );

  return (
    <div className="flex flex-col gap-y-8">
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
          className="hidden sm:block mr-4"
        />
        <TypoLead className="hidden sm:block">Propietaris</TypoLead>
      </header>

      <TypoH1>Nou Propietari</TypoH1>
      <CreateOwnerForm workspace={workspace} />
    </div>
  );
};
