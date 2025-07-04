import type { AnimalColumnConfig } from '../types';
import {
  childrenFilterOptions,
  createChildrenCountFilter,
} from '../shared/filters';
import { SEX } from '@/features/animals/consts/animal.consts';
import { MultiSelectWithSortHeader } from '../shared/headers';

export const createChildrenColumn = (): AnimalColumnConfig => ({
  accessorKey: 'children',
  filterFn: createChildrenCountFilter(),
  sortingFn: (animalA, animalB) => {
    const aIsMale = animalA.original.sex === SEX.M;
    const bIsMale = animalB.original.sex === SEX.M;

    if (aIsMale && bIsMale) return 1;
    if (aIsMale) return -1;
    if (bIsMale) return 1;

    return animalA.original.children.length - animalB.original.children.length;
  },
  header: ({ column }) => (
    <MultiSelectWithSortHeader
      column={column}
      filterLabel="Parts"
      label="Parts"
      filterOptions={childrenFilterOptions.map((opt) => ({
        value: opt,
        label: opt,
      }))}
    />
  ),
  cell: ({ row }) => {
    const { children, sex } = row.original;
    if (sex === SEX.M) return null;

    return <div>{children.length}</div>;
  },
});
