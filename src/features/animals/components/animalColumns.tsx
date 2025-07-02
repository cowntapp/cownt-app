import type { ColumnDef } from '@tanstack/react-table';
import type { AnimalRaw } from '../interfaces/animalGeneric';
import { ABSENCE, ORIGIN, SEX } from '../consts/animal.consts';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ArrowUpRightFromSquare,
  Check,
  ChevronDown,
  Info,
} from 'lucide-react';
import type { Breed } from '../breeds/interface/breed';
import type { Characteristic } from '../characteristics/interface/characteristic';
import type { AnimalPath } from '../interfaces/animalType';
// import { LOCALE } from '@/config/consts/configConsts';
import { Button } from '@/shadcn/components/ui/button';
import { Link } from 'react-router';
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
import { ResponsiveTooltip } from '@/shadcn/components/ui/responsive-tooltip';
import { formatDate } from '@/shared/utils/formatDate';

interface AnimalColumnsProps {
  breeds: Breed[];
  characteristics: Characteristic[];
  workspace: AnimalPath;
}

export const loadingAnimalsColumns: ColumnDef<AnimalRaw>[] = [
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

export const animalColumns = ({
  breeds,
  characteristics,
  workspace,
}: AnimalColumnsProps): ColumnDef<AnimalRaw>[] => [
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
        <div className="flex items-center w-full">
          <ResponsiveTooltip
            content={longCode}
            contentClassName="font-mono uppercase text-sm font-semibold"
            side="left"
          >
            <Button
              size={'icon'}
              variant={'ghost'}
            >
              <Info className="h-4 w-4 text-muted-foreground" />
            </Button>
          </ResponsiveTooltip>
          <Badge
            asChild
            className="font-mono mx-auto"
          >
            <Link to={`/${workspace}/${id}`}>
              {shortCode}
              <ArrowUpRightFromSquare className="text-muted size-3" />
            </Link>
          </Badge>
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
                key={breed.id}
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
      const breedName = breeds.find((b) => b.id === breed)?.value || breed;
      return breedName;
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
      const formattedDate = formatDate(birthDate) ?? '-';

      return <div className="text-center">{formattedDate}</div>;
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
              checked={filterValue?.includes(ORIGIN.BOUGHT)}
              onCheckedChange={() => handleToggle(ORIGIN.BOUGHT)}
            >
              Comprada
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filterValue?.includes(ORIGIN.BORN)}
              onCheckedChange={() => handleToggle(ORIGIN.BORN)}
            >
              Nascuda
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => {
      const { origin } = row.original;
      return origin === ORIGIN.BOUGHT ? 'Comprada' : 'Nascuda';
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
    sortingFn: (animalA, animalB) => {
      const aIsMale = animalA.original.sex === SEX.M;
      const bIsMale = animalB.original.sex === SEX.M;

      if (aIsMale && bIsMale) return 1;
      if (aIsMale) return -1;
      if (bIsMale) return 1;

      return (
        animalA.original.children.length - animalB.original.children.length
      );
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
                key={characteristic.id}
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
      const { characteristics: animalCharacteristics } = row.original;

      if (!animalCharacteristics || animalCharacteristics.length === 0) {
        return <span className="text-muted-foreground">-</span>;
      }

      return (
        <div className="flex gap-1">
          {animalCharacteristics.slice(0, 1).map((charId) => {
            const characteristic = characteristics.find((c) => c.id === charId);
            return (
              <Badge
                key={charId}
                variant="secondary"
              >
                {characteristic?.value || charId}
              </Badge>
            );
          })}
          {animalCharacteristics.length > 1 && (
            <ResponsiveTooltip
              side="right"
              content={
                <div className="space-y-1">
                  {animalCharacteristics.slice(1).map((charId) => {
                    const characteristic = characteristics.find(
                      (c) => c.id === charId
                    );
                    return (
                      <div
                        key={charId}
                        className="text-sm"
                      >
                        {characteristic?.value || charId}
                      </div>
                    );
                  })}
                </div>
              }
            >
              <Badge variant="outline">
                +{animalCharacteristics.length - 1}
              </Badge>
            </ResponsiveTooltip>
          )}
        </div>
      );
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

      if (!absence) {
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
          >
            <Check className="h-3 w-3 mr-1" />
            Present
          </Badge>
        );
      }

      const config = {
        [ABSENCE.SOLD]: {
          label: 'Venguda',
          className:
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
        },
        [ABSENCE.DEAD]: {
          label: 'Morta',
          className:
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
        },
      };

      const absenceConfig = config[absence];

      return (
        <Badge
          variant="secondary"
          className={absenceConfig?.className}
        >
          <Info className="h-3 w-3 mr-1" />
          {absenceConfig?.label}
        </Badge>
      );
    },
  },
];
