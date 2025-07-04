import type { AnimalColumnConfig } from '../types';
import { createNullableFilter } from '../shared/filters';
import { ABSENCE } from '@/features/animals/consts/animal.consts';
import { Check, Info } from 'lucide-react';
import { MultiSelectWithNullableHeader } from '../shared/headers';
import { ChipWithNullCell } from '../shared/cells';
import { i18n_absenceLabels } from '@/shared/translations/translations';

export const createAbsenceColumn = (): AnimalColumnConfig => ({
  accessorKey: 'absence',
  filterFn: createNullableFilter<ABSENCE | null>(),
  header: ({ column }) => (
    <MultiSelectWithNullableHeader
      column={column}
      label="Present"
      nullLabel="Present"
      options={Object.values(ABSENCE).map((val) => ({
        value: val,
        label: i18n_absenceLabels[val],
      }))}
    />
  ),
  cell: ({ row }) => {
    const { absence } = row.original;

    return (
      <ChipWithNullCell
        value={absence}
        nullConfig={{
          label: 'Present',
          icon: Check,
          variant: 'default',
        }}
        valueConfig={{
          [ABSENCE.SOLD]: {
            label: i18n_absenceLabels[ABSENCE.SOLD],
            className:
              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
          },
          [ABSENCE.DEAD]: {
            label: i18n_absenceLabels[ABSENCE.DEAD],
            className:
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
          },
        }}
        defaultIcon={Info}
      />
    );
  },
});
