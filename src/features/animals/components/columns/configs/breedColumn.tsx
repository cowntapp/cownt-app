import type { Breed } from '@/features/animals/breeds/interface/breed';
import { MultiSelectFilter } from '../shared/headers';
import type { AnimalColumnConfig } from '../types';
import { createMultiselectFilter } from '../shared/filters';

interface CreateBreedColumnProps {
  breeds: Breed[];
}

export const createBreedColumn = ({
  breeds,
}: CreateBreedColumnProps): AnimalColumnConfig => ({
  accessorKey: 'breed',
  filterFn: createMultiselectFilter(),
  header: ({ column }) => (
    <MultiSelectFilter
      column={column}
      label="Raça"
      options={breeds.map((breed) => ({
        value: breed.id,
        label: breed.value,
      }))}
    />
  ),
  cell: ({ row }) => {
    const { breed } = row.original;
    const breedName = breeds.find((b) => b.id === breed)?.value || breed;
    return breedName;
  },
});
