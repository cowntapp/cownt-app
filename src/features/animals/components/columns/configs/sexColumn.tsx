import { SEX } from '@/features/animals/consts/animal.consts';
import { MultiSelectFilter } from '../shared/headers';
import { createMultiselectFilter } from '../shared/filters';
import type { AnimalColumnConfig } from '../types';

export const createSexColumn = (): AnimalColumnConfig => ({
  accessorKey: 'sex',
  filterFn: createMultiselectFilter(),
  header: ({ column }) => (
    <MultiSelectFilter
      column={column}
      label="Sexe"
      options={[
        { value: SEX.M, label: 'Mascle' },
        { value: SEX.F, label: 'Femella' },
      ]}
    />
  ),
  cell: ({ row }) => {
    const { sex } = row.original;
    return sex === SEX.F ? 'Femella' : 'Mascle';
  },
});
