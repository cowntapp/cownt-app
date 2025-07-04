import type { AnimalColumnConfig } from '../types';
import { createMultiselectAllFilter } from '../shared/filters';
import { MultiSelectFilter } from '../shared/headers';
import type { Characteristic } from '@/features/animals/characteristics/interface/characteristic';
import { ChipListCell } from '../shared/cells';

interface CreateCharacteristicsColumnProps {
  characteristics: Characteristic[];
}

export const createCharacteristicsColumn = ({
  characteristics,
}: CreateCharacteristicsColumnProps): AnimalColumnConfig => ({
  accessorKey: 'characteristics',
  filterFn: createMultiselectAllFilter(),
  header: ({ column }) => (
    <MultiSelectFilter
      column={column}
      label="Característiques"
      options={characteristics.map((char) => ({
        value: char.id,
        label: char.value,
      }))}
    />
  ),
  cell: ({ row }) => {
    const { characteristics: animalCharac } = row.original;
    const animalCharacLabels = animalCharac.map(
      (charId) =>
        characteristics.find((ch) => ch.id === charId)?.value ?? charId
    );

    return <ChipListCell itemsList={animalCharacLabels} />;
  },
});
