import { DateCell } from '../shared/cells';
import { SortableHeader } from '../shared/headers';
import type { AnimalColumnConfig } from '../types';

export const createDeathDateColumn = (): AnimalColumnConfig => ({
  accessorKey: 'deathDate',
  header: ({ column }) => (
    <SortableHeader
      column={column}
      label="Mort"
    />
  ),
  cell: ({ row }) => {
    const { deathDate } = row.original;

    return <DateCell timestamp={deathDate} />;
  },
});
