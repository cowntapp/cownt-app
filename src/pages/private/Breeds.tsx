import { BreedsHeader } from '@/features/animals/breeds/components/BreedsHeader';
import { useBreeds } from '@/features/animals/breeds/hooks/useBreeds';
import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { Loader } from '@/shadcn/components/Loader/Loader';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { useRouterParams } from '@/shared/hooks/useRouterParams';

export const Breeds = () => {
  const { workspace } = useRouterParams('workspace');
  const { breedsQuery } = useBreeds(workspace as AnimalPath);

  if (breedsQuery.isLoading) {
    return <Loader />;
  }
  if (breedsQuery.isError) {
    return (
      <ErrorMessage
        className="mt-12"
        title="Error al carregar Races"
        description="Intenta-ho més tard"
      />
    );
  }

  const onRefetch = () => breedsQuery.refetch();

  return (
    <div>
      <BreedsHeader
        onRefetch={onRefetch}
        isFetching={breedsQuery.isFetching}
      />

      {breedsQuery.breeds?.map((breed) => (
        <div key={breed.id}>
          <div>{breed.value}</div>
        </div>
      ))}
    </div>
  );
};
