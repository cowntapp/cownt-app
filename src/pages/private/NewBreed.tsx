import { CreateBreedsForm } from '@/features/animals/breeds/components/Forms/CreateBreedsForm';
import { isAnimalPath } from '@/features/animals/interfaces/animalType';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { Navigate } from 'react-router';

export const NewBreed = () => {
  const { workspace } = useRouterParams('workspace');
  const isValidWorkspace = isAnimalPath(workspace);
  if (!isValidWorkspace) return <Navigate to={'/not-found'} />;

  return (
    <div className="flex flex-col gap-y-8">
      <TypoH1>Nova Raça</TypoH1>
      <CreateBreedsForm workspace={workspace} />
    </div>
  );
};
