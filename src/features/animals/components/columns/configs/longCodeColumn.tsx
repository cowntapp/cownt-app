import type { AnimalColumnConfig } from '../types';

export const createLongCodeColumn = (): AnimalColumnConfig => ({
  accessorKey: 'longCode',
  header: () => null,
  enableHiding: false,
  meta: { hidden: true },
  cell: () => null,
});
