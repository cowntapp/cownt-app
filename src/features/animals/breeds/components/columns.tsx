import type { ColumnDef } from '@tanstack/react-table';
import type { Breed } from '../interface/breed';
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
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from '@/shadcn/components/ui/dialog';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';

export const loadingBreedColumns: ColumnDef<Breed>[] = [
  {
    accessorKey: 'value',
    header: i18n_entities.breed,
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

interface BreedColumnsProps {
  onBreedDelete: (breedId: string) => void;
}

export const breedColumns = ({
  onBreedDelete,
}: BreedColumnsProps): ColumnDef<Breed>[] => [
  {
    accessorKey: 'value',
    header: i18n_entities.breed,
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
      const breed = row.original;

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
                <DropdownMenuLabel>({breed.value})</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link to={`./${breed.id}/edit`}>Edita</Link>
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
                <DialogTitle>Eliminar {breed.value}?</DialogTitle>
                <DialogDescription>
                  Estas segur? Aquesta acció no es pot desfer.
                  <TypoLead
                    variant="destructive"
                    className="py-4"
                  >
                    TOTES les vaques amb aquesta raça QUEDARAN SENSE RAÇA!
                  </TypoLead>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <div className="flex w-full justify-between">
                  <Button
                    variant={'destructive'}
                    onClick={() => onBreedDelete(breed.id)}
                  >
                    Eliminar Raça
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
