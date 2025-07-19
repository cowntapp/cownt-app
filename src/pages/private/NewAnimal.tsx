import { useSearchParams } from 'react-router';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { NewAnimalForm } from '@/features/animals/components/NewAnimal/NewAnimalForm';
import { NewAnimalFormHeader } from '@/features/animals/components/NewAnimal/components';
import { useCreateAnimal } from '@/features/animals/hooks/useCreateAnimal';
import { useBreeds } from '@/features/animals/breeds/hooks/useBreeds';
import { useCharacteristics } from '@/features/animals/characteristics/hooks/useCharacteristics';
import type { CreateAnimalPayload } from '@/features/animals/actions/createAnimal';
import { QueryBoundary } from '@/shared/components/QueryBoundary';
import type { Breed } from '@/features/animals/breeds/interface/breed';
import type { Characteristic } from '@/features/animals/characteristics/interface/characteristic';
import type { UseQueryResult } from '@tanstack/react-query';
import type { ORIGIN } from '@/features/animals/consts/animal.consts';
import { useOwners } from '@/features/animals/owners/hooks/useOwners';
import type { Owner } from '@/features/animals/owners/interface/owner';

type FormPreQueryData = {
  breeds: Breed[];
  characteristics: Characteristic[];
  owners: Owner[];
};

export const NewAnimal = () => {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get('origin') as ORIGIN | null;
  const motherId = searchParams.get('motherId');

  const workspace = useRouterParams('workspace').workspace as AnimalPath;
  const { createAnimalMutation } = useCreateAnimal(workspace);
  const { breedsQuery } = useBreeds(workspace);
  const { characteristicsQuery } = useCharacteristics(workspace);
  const { ownersQuery } = useOwners();

  const handleAnimalSubmit = (animal: CreateAnimalPayload) => {
    createAnimalMutation.createAnimal({ payload: animal });
  };

  // Query sintética que combina ambas queries necesarias para el form
  const formDataQuery = {
    data:
      breedsQuery.breeds &&
      characteristicsQuery.characteristics &&
      ownersQuery.owners
        ? {
            breeds: breedsQuery.breeds,
            characteristics: characteristicsQuery.characteristics,
            owners: ownersQuery.owners,
          }
        : undefined,
    isLoading:
      breedsQuery.isLoading ||
      characteristicsQuery.isLoading ||
      ownersQuery.isLoading,
    isError:
      breedsQuery.isError ||
      characteristicsQuery.isError ||
      ownersQuery.isError,
    error:
      breedsQuery.error ||
      characteristicsQuery.error ||
      ownersQuery.error ||
      null,
  } as unknown as UseQueryResult<FormPreQueryData, Error>;

  return (
    <div className="max-w-7xl">
      <QueryBoundary query={formDataQuery}>
        {({ breeds, characteristics, owners }) => (
          <NewAnimalForm
            isPending={createAnimalMutation.isPending}
            onAnimalSubmit={handleAnimalSubmit}
            origin={origin}
            motherId={motherId}
            breeds={breeds}
            characteristics={characteristics}
            owners={owners}
          >
            <NewAnimalFormHeader origin={origin} />
          </NewAnimalForm>
        )}
      </QueryBoundary>
    </div>
  );
};
