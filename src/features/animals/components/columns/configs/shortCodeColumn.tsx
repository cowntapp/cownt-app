import type { AnimalColumnConfig } from '../types';
import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { SortableHeader } from '../shared/headers';
import { LinkCell } from '../shared/cells';

interface Props {
  workspace: AnimalPath;
}

export const createShortCodeColumn = ({
  workspace,
}: Props): AnimalColumnConfig => ({
  accessorKey: 'shortCode',
  header: ({ column }) => (
    <SortableHeader
      column={column}
      label="Codi curt"
    />
  ),
  cell: ({ row }) => {
    const { id, longCode, shortCode } = row.original;
    return (
      <LinkCell
        url={`/${workspace}/${id}`}
        label={shortCode}
        tooltip
        tooltipContent={longCode}
      />
    );
  },
});
