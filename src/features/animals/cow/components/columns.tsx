import type { ColumnDef } from '@tanstack/react-table';

import type { CowRaw } from '../interfaces/cow';
import { ABSENCE, ORIGIN, SEX } from '../../consts/animal.consts';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRightFromSquare,
  Check,
  ChevronDown,
} from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shadcn/components/ui/dropdown-menu';
import { Badge } from '@/shadcn/components/ui/badge';

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
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.getValue(columnId));
    },
    header: ({ column }) => {
      const filterValue = column.getFilterValue() as string[] | undefined;

      const handleToggle = (sex: string) => {
        let next: string[] = Array.isArray(filterValue) ? [...filterValue] : [];
        if (next.includes(sex)) {
          next = next.filter((v) => v !== sex);
        } else {
          next.push(sex);
        }
        column.setFilterValue(next.length ? next : undefined);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={filterValue?.length ? 'outline' : 'ghost'}>
              Sexe
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={filterValue?.includes(SEX.M)}
              onCheckedChange={() => handleToggle(SEX.M)}
            >
              Mascle
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterValue?.includes(SEX.F)}
              onCheckedChange={() => handleToggle(SEX.F)}
            >
              Femella
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
              <Badge
                asChild
                className="font-mono mx-auto"
              >
                <Link to={`./${id}`}>
                  {shortCode}
                  <ArrowUpRightFromSquare className="text-muted size-3" />
                </Link>
              </Badge>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="font-mono font-semibold text-sm"
            >
              {longCode}
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    accessorKey: 'origin',
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.getValue(columnId));
    },
    header: ({ column }) => {
      const filterValue = column.getFilterValue() as string[] | undefined;

      const handleToggle = (origin: string) => {
        let next: string[] = Array.isArray(filterValue) ? [...filterValue] : [];
        if (next.includes(origin)) {
          next = next.filter((v) => v !== origin);
        } else {
          next.push(origin);
        }
        column.setFilterValue(next.length ? next : undefined);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={filterValue?.length ? 'outline' : 'ghost'}>
              Origen
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={filterValue?.includes(ORIGIN.BORN)}
              onCheckedChange={() => handleToggle(ORIGIN.BORN)}
            >
              Nascuda
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterValue?.includes(ORIGIN.BOUGHT)}
              onCheckedChange={() => handleToggle(ORIGIN.BOUGHT)}
            >
              Comprada
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const { origin } = row.original;

      return origin === ORIGIN.BORN ? 'Nascuda' : 'Comprada';
    },
  },
  {
    accessorKey: 'children',
    filterFn: (row, _, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      const count = row.original.children.length;
      return filterValue.some((val: string) => {
        if (val === '0') return count === 0;
        if (val === '1') return count === 1;
        if (val === '2+') return count >= 2;
        return false;
      });
    },
    sortingFn: (cowA, cowB) => {
      const aIsMale = cowA.original.sex === SEX.M;
      const bIsMale = cowB.original.sex === SEX.M;

      if (aIsMale && bIsMale) return 1;
      if (aIsMale) return -1;
      if (bIsMale) return 1;

      return cowA.original.children.length - cowB.original.children.length;
    },
    header: ({ column }) => {
      const filterValue = column.getFilterValue() as string[] | undefined;
      const isSorted = column.getIsSorted();

      const handleToggle = (val: string) => {
        let next: string[] = Array.isArray(filterValue) ? [...filterValue] : [];
        if (next.includes(val)) {
          next = next.filter((v) => v !== val);
        } else {
          next.push(val);
        }
        column.setFilterValue(next.length ? next : undefined);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={filterValue?.length ?? isSorted ? 'outline' : 'ghost'}
            >
              Parts
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Ordre</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={isSorted === 'asc'}
                onCheckedChange={() => column.toggleSorting(false)}
              >
                Asc
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={isSorted === 'desc'}
                onCheckedChange={() => column.toggleSorting(true)}
              >
                Desc
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Filtre</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={filterValue?.includes('0')}
                onCheckedChange={() => handleToggle('0')}
              >
                0
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterValue?.includes('1')}
                onCheckedChange={() => handleToggle('1')}
              >
                1
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterValue?.includes('2+')}
                onCheckedChange={() => handleToggle('2+')}
              >
                2+
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.getValue(columnId));
    },
    header: ({ column }) => {
      const filterValue = column.getFilterValue() as string[] | undefined;

      const handleToggle = (breed: string) => {
        let next: string[] = Array.isArray(filterValue) ? [...filterValue] : [];
        if (next.includes(breed)) {
          next = next.filter((v) => v !== breed);
        } else {
          next.push(breed);
        }
        column.setFilterValue(next.length ? next : undefined);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={filterValue?.length ? 'outline' : 'ghost'}>
              Raça
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {breeds.map((breed) => (
              <DropdownMenuCheckboxItem
                key={`table-cows-breed-filter-${breed.id}`}
                checked={filterValue?.includes(breed.id)}
                onCheckedChange={() => handleToggle(breed.id)}
              >
                {breed.value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const { breed } = row.original;

      return breeds?.find((br) => br.id === breed)?.value ?? '-';
    },
  },
  {
    accessorKey: 'characteristics',
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      const values: string[] = row.getValue(columnId);
      return filterValue.every((val: string) => values.includes(val));
    },
    header: ({ column }) => {
      const filterValue = column.getFilterValue() as string[] | undefined;

      const handleToggle = (characteristic: string) => {
        let next: string[] = Array.isArray(filterValue) ? [...filterValue] : [];
        if (next.includes(characteristic)) {
          next = next.filter((v) => v !== characteristic);
        } else {
          next.push(characteristic);
        }
        column.setFilterValue(next.length ? next : undefined);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={filterValue?.length ? 'outline' : 'ghost'}>
              Característiques
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {characteristics.map((characteristic) => (
              <DropdownMenuCheckboxItem
                key={`table-cows-char-filter-${characteristic.id}`}
                checked={filterValue?.includes(characteristic.id)}
                onCheckedChange={() => handleToggle(characteristic.id)}
              >
                {characteristic.value}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const { characteristics: cowChars } = row.original;
      return characteristics
        .filter((char) => cowChars.includes(char.id))
        .map((char) => (
          <Badge
            variant={'outline'}
            className="mr-1"
          >
            {char.value}
          </Badge>
        ));
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
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      const value = row.getValue(columnId);
      return filterValue.some(
        (f: null | typeof ABSENCE.DEAD | typeof ABSENCE.SOLD) =>
          f === null ? value == null : value === f
      );
    },
    header: ({ column }) => {
      const filterValue = column.getFilterValue() as
        | (string | null)[]
        | undefined;

      const handleToggle = (absence: string | null) => {
        let next: (string | null)[] = Array.isArray(filterValue)
          ? [...filterValue]
          : [];
        if (next.includes(absence)) {
          next = next.filter((v) => v !== absence);
        } else {
          next.push(absence);
        }
        column.setFilterValue(next.length ? next : undefined);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={filterValue?.length ? 'outline' : 'ghost'}>
              Present
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={filterValue?.includes(null) ?? false}
              onCheckedChange={() => handleToggle(null)}
            >
              Present
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterValue?.includes(ABSENCE.DEAD)}
              onCheckedChange={() => handleToggle(ABSENCE.DEAD)}
            >
              Morta
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterValue?.includes(ABSENCE.SOLD)}
              onCheckedChange={() => handleToggle(ABSENCE.SOLD)}
            >
              Venguda
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
