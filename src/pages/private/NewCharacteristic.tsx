import { CreateCharacteristicForm } from '@/features/animals/characteristics/components/Forms/CreateCharacteristicForm';
import { isAnimalPath } from '@/features/animals/interfaces/animalType';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { Button } from '@/shadcn/components/ui/button';
import { Separator } from '@/shadcn/components/ui/separator';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { i18n_entities } from '@/shared/translations/translations';
import { ArrowLeft } from 'lucide-react';
import { Link, Navigate } from 'react-router';

export const NewCharacteristic = () => {
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
      <header className="flex items-center gap-2">
        <Button
          asChild
          variant={'link'}
        >
          <Link to={'..'}>
            <ArrowLeft />
            <span>Torna a Característiques</span>
          </Link>
        </Button>
        <Separator
          orientation="vertical"
          className="hidden sm:block mr-2"
        />
        <TypoLead className="hidden sm:block">
          Característiques {i18n_entities[workspace]}
        </TypoLead>
      </header>

      <TypoH1>Nova Característica</TypoH1>
      <CreateCharacteristicForm workspace={workspace} />
    </div>
  );
};
