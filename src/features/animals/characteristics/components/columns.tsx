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
import { Link } from 'react-router';
import { Skeleton } from '@/shadcn/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/shadcn/components/ui/dialog';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';

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

interface CharacteristicColumnsProps {
  onCharacteristicDelete: (characteristicId: string) => void;
}

export const characteristicColumns = ({
  onCharacteristicDelete,
}: CharacteristicColumnsProps): ColumnDef<Characteristic>[] => [
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
          <Dialog>
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
                <DropdownMenuSeparator />
                <DropdownMenuLabel>({characteristic.value})</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to={`./${characteristic.id}/edit`}>Edita</Link>
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem variant="destructive">
                    Elimina
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Eliminar {characteristic.value}?</DialogTitle>
                <DialogDescription>
                  Estas segur? Aquesta acció no es pot desfer.
                </DialogDescription>
                <TypoLead
                  asChild
                  variant="destructive"
                  className="py-4"
                >
                  <DialogDescription>
                    Si queden animals amb aquesta Característica no podràs
                    eliminar-la.
                  </DialogDescription>
                </TypoLead>
              </DialogHeader>
              <DialogFooter>
                <div className="flex w-full justify-between">
                  <Button
                    variant={'destructive'}
                    onClick={() => onCharacteristicDelete(characteristic.id)}
                  >
                    Eliminar Característica
                  </Button>
                  <DialogClose asChild>
                    <Button>Cancelar</Button>
                  </DialogClose>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
