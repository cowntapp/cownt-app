import { getFormattedPriceStringIntl } from '@/shared/utils/formatPrice';
import { SortableHeader } from '../shared/headers';
import type { AnimalColumnConfig } from '../types';

export const createSalePriceColumn = (): AnimalColumnConfig => ({
  accessorKey: 'salePrice',
  header: ({ column }) => (
    <SortableHeader
      column={column}
      label="€ Venda"
    />
  ),
  cell: ({ row }) => {
    const { salePrice } = row.original;
    const price = getFormattedPriceStringIntl(salePrice);

    return <span className="font-mono">{price}</span>;
  },
});
