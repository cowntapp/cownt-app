import { ORIGIN } from '@/features/animals/consts/animal.consts';
import { createMultiselectFilter } from '../shared/filters';
import { MultiSelectFilter } from '../shared/headers';
import type { AnimalColumnConfig } from '../types';
import { i18n_originLabels } from '@/shared/translations/translations';

export const createOriginColumn = (): AnimalColumnConfig => ({
  accessorKey: 'origin',
  filterFn: createMultiselectFilter(),
  header: ({ column }) => (
    <MultiSelectFilter
      column={column}
      label="Origen"
      options={Object.values(ORIGIN).map((origin) => ({
        value: origin,
        label: i18n_originLabels[origin],
      }))}
    />
  ),
  cell: ({ row }) => {
    const { origin } = row.original;
    return origin === ORIGIN.BOUGHT ? 'Comprada' : 'Nascuda';
  },
});
