import { SortableHeader } from '../shared/headers';
import type { AnimalColumnConfig } from '../types';
import { PriceCell } from '../shared/cells';

export const createBuyPriceColumn = (): AnimalColumnConfig => ({
  accessorKey: 'buyPrice',
  header: ({ column }) => (
    <SortableHeader
      column={column}
      label="€ Compra"
    />
  ),
  cell: ({ row }) => {
    const { buyPrice } = row.original;

    return <PriceCell price={buyPrice} />;
  },
});
