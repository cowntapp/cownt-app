import type { ColumnDef } from '@tanstack/react-table';

import type { CowRaw } from '../interfaces/cow';
import { ABSENCE, ORIGIN, SEX } from '../../consts/animal.consts';
import { Check } from 'lucide-react';
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

interface CowColumnsProps {
  breeds: Breed[];
  characteristics: Characteristic[];
}

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
    accessorKey: 'shortCode',
    header: () => <div className="text-center">Codi curt</div>,
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
    header: 'Parts',
    cell: ({ row }) => {
      const { children, sex } = row.original;

      return sex === SEX.M ? '-' : children.length;
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
    header: 'Naixament',
    cell: ({ row }) => {
      const { birthDate } = row.original;
      if (!birthDate) return '-';
      const formattedDate = Intl.DateTimeFormat(LOCALE, {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      }).format(new Date(Number(birthDate)));

      return formattedDate;
    },
  },
  {
    accessorKey: 'buyPrice',
    header: () => <div className="text-right">€ Compra</div>,
    cell: ({ row }) => {
      const { buyPrice } = row.original;
      if (!buyPrice) return <div className="text-right">-</div>;

      const formatted = new Intl.NumberFormat(LOCALE, {
        style: 'currency',
        currency: 'EUR',
      }).format(buyPrice);
      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: 'salePrice',
    header: () => <div className="text-right">€ Venta</div>,
    cell: ({ row }) => {
      const { salePrice } = row.original;
      if (!salePrice) return <div className="text-right">-</div>;

      const formatted = new Intl.NumberFormat(LOCALE, {
        style: 'currency',
        currency: 'EUR',
      }).format(salePrice);
      return <div className="text-right">{formatted}</div>;
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
