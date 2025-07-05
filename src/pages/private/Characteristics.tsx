import { CharacteristicsHeader } from '@/features/animals/characteristics/components/CharacteristicsHeader';
import {
  characteristicColumns,
  loadingCharacteristicColumns,
} from '@/features/animals/characteristics/components/columns';
import { useCharacteristics } from '@/features/animals/characteristics/hooks/useCharacteristics';
import { useDeleteCharacteristic } from '@/features/animals/characteristics/hooks/useDeleteCharacteristic';
import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { DataTable } from '@/shadcn/components/ui/data-table';
import { QueryBoundary } from '@/shared/components/QueryBoundary';
import { useRouterParams } from '@/shared/hooks/useRouterParams';

export const Characteristics = () => {
  const { workspace } = useRouterParams('workspace');

  const { characteristicsQuery } = useCharacteristics(workspace as AnimalPath);
  const { deleteCharacteristicMutation } = useDeleteCharacteristic(
    workspace as AnimalPath
  );

  const onRefetch = () => characteristicsQuery.refetch();
  const onCharacteristicDelete = (characteristicId: string) => {
    deleteCharacteristicMutation.deleteCharacteristic({ characteristicId });
  };

  return (
    <div>
      <CharacteristicsHeader
        onRefetch={onRefetch}
        isFetching={characteristicsQuery.isFetching}
      />

      <QueryBoundary
        query={characteristicsQuery}
        loaderComponent={
          <DataTable
            columns={loadingCharacteristicColumns}
            data={new Array(3)}
          />
        }
      >
        {({ characteristics }) => (
          <DataTable
            columns={characteristicColumns({ onCharacteristicDelete })}
            data={characteristics}
          />
        )}
      </QueryBoundary>
    </div>
  );
};
