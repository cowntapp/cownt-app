import type { ColumnDef } from '@tanstack/react-table';

import type { CowRaw } from '../interfaces/cow';
import { ABSENCE, ORIGIN, SEX } from '../../consts/animal.consts';
import { ArrowDown, ArrowUp, ArrowUpDown, Check } from 'lucide-react';
import type { Breed } from '../../breeds/interface/breed';
import type { Characteristic } from '../../characteristics/interface/characteristic';
import { LOCALE } from '@/config/consts/configConsts';
import { Button } from '@/shadcn/components/ui/button';
import { Link } from 'react-router';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shadcn/components/ui/tooltip';
import { Skeleton } from '@/shadcn/components/ui/skeleton';

interface CowColumnsProps {
  breeds: Breed[];
  characteristics: Characteristic[];
}

export const loadingCowsColumns: ColumnDef<CowRaw>[] = [
  {
    accessorKey: 'longCode',
    header: () => {
      return <Skeleton className="h-8 max-w-sm" />;
    },
    cell: () => {
      return <Skeleton className="h-8 max-w-xs" />;
    },
  },
];

export const cowCowlumns = ({
  breeds,
  characteristics,
}: CowColumnsProps): ColumnDef<CowRaw>[] => [
  {
    accessorKey: 'sex',
    header: 'Sexe',
    cell: ({ row }) => {
      const { sex } = row.original;

      return sex === SEX.F ? 'Femella' : 'Mascle';
    },
  },
  {
    accessorKey: 'longCode',
    header: () => null,
    enableHiding: false,
    meta: { hidden: true },
    cell: () => null,
  },
  {
    accessorKey: 'shortCode',
    header: ({ column }) => (
      <Button
        variant={column.getIsSorted() ? 'outline' : 'ghost'}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Codi curt
        {column.getIsSorted() === false ? (
          <ArrowUpDown className="size-3" />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUp className="size-3" />
        ) : (
          <ArrowDown className="size-3" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const { id, longCode, shortCode } = row.original;
      return (
        <div className="flex flex-col w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                size={'sm'}
              >
                <Link to={`./${id}`}>{shortCode}</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{longCode}</TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    accessorKey: 'origin',
    header: 'Origen',
    cell: ({ row }) => {
      const { origin } = row.original;

      return origin === ORIGIN.BORN ? 'Nascuda' : 'Comprada';
    },
  },
  {
    accessorKey: 'children',
    sortingFn: (cowA, cowB) => {
      const aIsMale = cowA.original.sex === SEX.M;
      const bIsMale = cowB.original.sex === SEX.M;

      if (aIsMale && bIsMale) return 1;
      if (aIsMale) return -1;
      if (bIsMale) return 1;

      return cowA.original.children.length - cowB.original.children.length;
    },
    header: ({ column }) => (
      <Button
        variant={column.getIsSorted() ? 'outline' : 'ghost'}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Parts
        {column.getIsSorted() === false ? (
          <ArrowUpDown className="size-3" />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUp className="size-3" />
        ) : (
          <ArrowDown className="size-3" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const { children, sex } = row.original;

      return (
        <div className="text-center">
          {sex === SEX.M ? '-' : children.length}
        </div>
      );
    },
  },
  {
    accessorKey: 'breed',
    header: 'Raça',
    cell: ({ row }) => {
      const { breed } = row.original;

      return breeds?.find((br) => br.id === breed)?.value ?? '-';
    },
  },
  {
    accessorKey: 'characteristics',
    header: 'Característiques',
    cell: ({ row }) => {
      const { characteristics: cowChars } = row.original;

      return characteristics
        .filter((char) => cowChars.includes(char.id))
        .map((char) => char.value)
        .join(', ');
    },
  },
  {
    accessorKey: 'birthDate',
    header: ({ column }) => (
      <Button
        variant={column.getIsSorted() ? 'outline' : 'ghost'}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Naixament
        {column.getIsSorted() === false ? (
          <ArrowUpDown className="size-3" />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUp className="size-3" />
        ) : (
          <ArrowDown className="size-3" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const { birthDate } = row.original;
      if (!birthDate) return '-';
      const formattedDate = Intl.DateTimeFormat(LOCALE, {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(new Date(Number(birthDate)));

      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'buyPrice',
    header: ({ column }) => (
      <Button
        variant={column.getIsSorted() ? 'outline' : 'ghost'}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        € Compra
        {column.getIsSorted() === false ? (
          <ArrowUpDown className="size-3" />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUp className="size-3" />
        ) : (
          <ArrowDown className="size-3" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const { buyPrice } = row.original;
      if (!buyPrice) return <div className="text-right">-</div>;

      const formatted = new Intl.NumberFormat(LOCALE, {
        style: 'currency',
        currency: 'EUR',
      }).format(buyPrice);
      return <div className="text-right px-2">{formatted}</div>;
    },
  },
  {
    accessorKey: 'salePrice',
    header: ({ column }) => (
      <Button
        variant={column.getIsSorted() ? 'outline' : 'ghost'}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        € Venta
        {column.getIsSorted() === false ? (
          <ArrowUpDown className="size-3" />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUp className="size-3" />
        ) : (
          <ArrowDown className="size-3" />
        )}
      </Button>
    ),
    cell: ({ row }) => {
      const { salePrice } = row.original;
      if (!salePrice) return <div className="text-right px-2">-</div>;

      const formatted = new Intl.NumberFormat(LOCALE, {
        style: 'currency',
        currency: 'EUR',
      }).format(salePrice);
      return <div className="text-right px-2">{formatted}</div>;
    },
  },
  {
    accessorKey: 'absence',
    header: 'Present',
    cell: ({ row }) => {
      const { absence } = row.original;

      return absence === null ? (
        <Check />
      ) : absence === ABSENCE.DEAD ? (
        'Morta'
      ) : absence === ABSENCE.SOLD ? (
        'Venguda'
      ) : (
        '-'
      );
    },
  },
];
