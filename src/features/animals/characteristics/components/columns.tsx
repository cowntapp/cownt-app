import type { ColumnDef } from '@tanstack/react-table';
import type { Characteristic } from '../interface/characteristic';
import { i18n_entities } from '@/shared/translations/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shadcn/components/ui/dropdown-menu';
import { Button } from '@/shadcn/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router';
import { Skeleton } from '@/shadcn/components/ui/skeleton';

export const loadingCharacteristicColumns: ColumnDef<Characteristic>[] = [
  {
    accessorKey: 'value',
    header: i18n_entities.characteristic,
    cell: () => {
      return <Skeleton className="h-8" />;
    },
  },
  {
    id: 'actions',
    header: () => {
      return (
        <div className="flex justify-end">
          <Button
            size={'sm'}
            asChild
          >
            <Link to={'./new'}>Nova</Link>
          </Button>
        </div>
      );
    },
  },
];

export const characteristicColumns: ColumnDef<Characteristic>[] = [
  {
    accessorKey: 'value',
    header: i18n_entities.characteristic,
  },
  {
    id: 'actions',
    header: () => {
      return (
        <div className="flex justify-end">
          <Button
            size={'sm'}
            asChild
          >
            <Link to={'./new'}>Nova</Link>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const characteristic = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={'ghost'}
                className="size-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Accions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(characteristic.value);
                  toast.success(`"${characteristic.value}" copiat!`);
                }}
              >
                Copiar text
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`./${characteristic.id}/edit`}>Edita</Link>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Elimina</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
