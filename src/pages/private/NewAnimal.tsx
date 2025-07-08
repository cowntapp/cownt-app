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

type FormPreQueryData = {
  breeds: Breed[];
  characteristics: Characteristic[];
};

export const NewAnimal = () => {
  const [searchParams] = useSearchParams();
  const origin = searchParams.get('origin') as 'bought' | 'born' | null;
  const motherId = searchParams.get('motherId');

  const workspace = useRouterParams('workspace').workspace as AnimalPath;
  const { createAnimalMutation } = useCreateAnimal(workspace);
  const { breedsQuery } = useBreeds(workspace);
  const { characteristicsQuery } = useCharacteristics(workspace);

  const handleAnimalSubmit = (animal: CreateAnimalPayload) => {
    createAnimalMutation.createAnimal({ payload: animal });
  };

  // Query sintética que combina ambas queries necesarias para el form
  const formDataQuery = {
    data:
      breedsQuery.breeds && characteristicsQuery.characteristics
        ? {
            breeds: breedsQuery.breeds,
            characteristics: characteristicsQuery.characteristics,
          }
        : undefined,
    isLoading: breedsQuery.isLoading || characteristicsQuery.isLoading,
    isError: breedsQuery.isError || characteristicsQuery.isError,
    error: breedsQuery.error || characteristicsQuery.error || null,
  } as unknown as UseQueryResult<FormPreQueryData, Error>;

  return (
    <div className="max-w-7xl">
      <QueryBoundary query={formDataQuery}>
        {({ breeds, characteristics }) => (
          <NewAnimalForm
            isPending={createAnimalMutation.isPending}
            onAnimalSubmit={handleAnimalSubmit}
            origin={origin}
            motherId={motherId}
            breeds={breeds}
            characteristics={characteristics}
          >
            <NewAnimalFormHeader origin={origin} />
          </NewAnimalForm>
        )}
      </QueryBoundary>
    </div>
  );
};
