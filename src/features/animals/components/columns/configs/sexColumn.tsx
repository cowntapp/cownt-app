import { SEX } from '@/features/animals/consts/animal.consts';
import { MultiSelectFilter } from '../shared/headers';
import { createMultiselectFilter } from '../shared/filters';
import type { AnimalColumnConfig } from '../types';
import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { AnimalIcon } from '../../icons/AnimalIcon';

interface SexColumnProps {
  workspace: AnimalPath;
}

export const createSexColumn = ({
  workspace,
}: SexColumnProps): AnimalColumnConfig => ({
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
    return (
      <AnimalIcon
        className="bg-white/5 p-1 size-8 rounded-full m-1 ml-2"
        type={workspace}
        sex={sex}
      />
    );
  },
});
