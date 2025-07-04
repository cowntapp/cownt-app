import { DateCell } from '../shared/cells';
import { SortableHeader } from '../shared/headers';
import type { AnimalColumnConfig } from '../types';

export const createBirthDateColumn = (): AnimalColumnConfig => ({
  accessorKey: 'birthDate',
  header: ({ column }) => (
    <SortableHeader
      column={column}
      label="Naixament"
    />
  ),
  cell: ({ row }) => {
    const { birthDate } = row.original;

    return <DateCell timestamp={birthDate} />;
  },
});
