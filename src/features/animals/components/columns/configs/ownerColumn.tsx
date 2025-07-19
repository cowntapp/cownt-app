import type { Owner } from '@/features/animals/owners/interface/owner';
import type { AnimalColumnConfig } from '../types';
import { createMultiselectFilter } from '../shared/filters';
import { MultiSelectFilter } from '../shared/headers';

interface CreateOwnerColumnProps {
  owners: Owner[];
}

export const createOwnerColumn = ({
  owners,
}: CreateOwnerColumnProps): AnimalColumnConfig => ({
  accessorKey: 'owner',
  filterFn: createMultiselectFilter(),
  header: ({ column }) => (
    <MultiSelectFilter
      column={column}
      label="Propietari"
      options={owners.map((owner) => ({
        value: owner.id,
        label: owner.value,
      }))}
    />
  ),
  cell: ({ row }) => {
    const { owner } = row.original;
    const ownerName = owners.find((b) => b.id === owner)?.value || owner;
    return ownerName;
  },
});
