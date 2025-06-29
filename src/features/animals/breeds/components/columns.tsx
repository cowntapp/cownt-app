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
import { toast } from 'sonner';
import { Link } from 'react-router';
import { Skeleton } from '@/shadcn/components/ui/skeleton';

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

export const breedColumns: ColumnDef<Breed>[] = [
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(breed.value);
                  toast.success(`${breed.value} copied to clipboard`);
                }}
              >
                Copy breed value
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`./${breed.id}/edit`}>Edit breed</Link>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                Delete breed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
