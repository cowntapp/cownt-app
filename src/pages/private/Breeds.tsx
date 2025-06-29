import { BreedsHeader } from '@/features/animals/breeds/components/BreedsHeader';
import {
  breedColumns,
  loadingBreedColumns,
} from '@/features/animals/breeds/components/columns';
import { useBreeds } from '@/features/animals/breeds/hooks/useBreeds';
import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { DataTable } from '@/shadcn/components/ui/data-table';
import { QueryBoundary } from '@/shared/components/QueryBoundary';
import { useRouterParams } from '@/shared/hooks/useRouterParams';

export const Breeds = () => {
  const { workspace } = useRouterParams('workspace');
  const { breedsQuery } = useBreeds(workspace as AnimalPath);

  const onRefetch = () => breedsQuery.refetch();

  return (
    <div>
      <BreedsHeader
        onRefetch={onRefetch}
        isFetching={breedsQuery.isFetching}
      />

      <QueryBoundary
        query={breedsQuery}
        loaderComponent={
          <DataTable
            columns={loadingBreedColumns}
            data={new Array(3)}
          />
        }
      >
        {({ breeds }) => (
          <DataTable
            columns={breedColumns}
            data={breeds}
          />
        )}
      </QueryBoundary>
    </div>
  );
};
