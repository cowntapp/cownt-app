import type { ColumnDef } from '@tanstack/react-table';
import type { Owner } from '../interface/owner';
import { i18n_entities } from '@/shared/translations/translations';
import { Skeleton } from '@/shadcn/components/ui/skeleton';
import { Button } from '@/shadcn/components/ui/button';
import { Link } from 'react-router';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';

export const loadingOwnerColumns: ColumnDef<Owner>[] = [
  {
    accessorKey: 'value',
    header: i18n_entities.owner,
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
            <Link to={'./new'}>Nou</Link>
          </Button>
        </div>
      );
    },
  },
];

interface OwnerColumnsProps {
  onOwnerDelete: (ownerId: string) => void;
}

export const ownerColumns = ({
  onOwnerDelete,
}: OwnerColumnsProps): ColumnDef<Owner>[] => [
  {
    accessorKey: 'value',
    header: i18n_entities.owner,
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
            <Link to={'./new'}>Nou</Link>
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const owner = row.original;

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
                <DropdownMenuLabel>({owner.value})</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    to={`./${owner.id}/edit`}
                    state={{ owner }}
                  >
                    Edita
                  </Link>
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
                <DialogTitle>Eliminar {owner.value}?</DialogTitle>
                <DialogDescription>
                  Estas segur? Aquesta acció no es pot desfer.
                </DialogDescription>
                <TypoLead
                  variant="destructive"
                  className="py-4"
                  asChild
                >
                  <DialogDescription>
                    Si queden animals amb aquest Propietari no podràs
                    eliminar-lo.
                  </DialogDescription>
                </TypoLead>
              </DialogHeader>
              <DialogFooter>
                <div className="flex w-full justify-between">
                  <Button
                    variant={'destructive'}
                    onClick={() => onOwnerDelete(owner.id)}
                  >
                    Eliminar Propietari
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
