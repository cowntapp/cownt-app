import type { AnimalRaw } from '@/features/animals/interfaces/animal';
import { Button } from '@/shadcn/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import type { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FilterProps {
  column: Column<AnimalRaw>;
  options: Option[];
  label: string;
}

export const MultiSelectFilter = ({ column, options, label }: FilterProps) => {
  const filterValue = column.getFilterValue() as string[] | undefined;

  const handleToggle = (value: string) => {
    let next: string[] = Array.isArray(filterValue) ? [...filterValue] : [];
    if (next.includes(value)) {
      next = next.filter((v) => v !== value);
    } else {
      next.push(value);
    }
    column.setFilterValue(next.length ? next : undefined);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={filterValue?.length ? 'outline' : 'ghost'}>
          {label}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={filterValue?.includes(option.value) ?? false}
            onCheckedChange={() => handleToggle(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface SortableHeaderProps {
  column: Column<AnimalRaw>;
  label: string;
}

export const SortableHeader = ({ column, label }: SortableHeaderProps) => (
  <Button
    variant={column.getIsSorted() ? 'outline' : 'ghost'}
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  >
    {label}
    {column.getIsSorted() === false ? (
      <ArrowUpDown className="size-3" />
    ) : column.getIsSorted() === 'asc' ? (
      <ArrowUp className="size-3" />
    ) : (
      <ArrowDown className="size-3" />
    )}
  </Button>
);

interface MultiSelectWithSortHeaderProps {
  column: Column<AnimalRaw>;
  filterOptions: Option[];
  filterLabel: string;
  label: string;
}
export const MultiSelectWithSortHeader = ({
  column,
  filterOptions,
  filterLabel,
  label,
}: MultiSelectWithSortHeaderProps) => {
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
        <Button variant={filterValue?.length ?? isSorted ? 'outline' : 'ghost'}>
          {label}
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
          <DropdownMenuLabel>{filterLabel}</DropdownMenuLabel>
          {filterOptions.map((opt) => (
            <DropdownMenuCheckboxItem
              key={opt.label}
              checked={filterValue?.includes(opt.value)}
              onCheckedChange={() => handleToggle(opt.value)}
            >
              {opt.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface NullableOption {
  value: string | null;
  label: string;
}

interface MultiSelectWithNullableHeaderProps {
  column: Column<AnimalRaw>;
  options: NullableOption[];
  label: string;
  nullLabel?: string; // Label for the null option (e.g., "Present")
}

export const MultiSelectWithNullableHeader = ({
  column,
  options,
  label,
  nullLabel = 'None',
}: MultiSelectWithNullableHeaderProps) => {
  const filterValue = column.getFilterValue() as (string | null)[] | undefined;

  const handleToggle = (value: string | null) => {
    let next: (string | null)[] = Array.isArray(filterValue)
      ? [...filterValue]
      : [];
    if (next.includes(value)) {
      next = next.filter((v) => v !== value);
    } else {
      next.push(value);
    }
    column.setFilterValue(next.length ? next : undefined);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={filterValue?.length ? 'outline' : 'ghost'}>
          {label}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Null option */}
        <DropdownMenuCheckboxItem
          checked={filterValue?.includes(null) ?? false}
          onCheckedChange={() => handleToggle(null)}
        >
          {nullLabel}
        </DropdownMenuCheckboxItem>

        {/* Regular options */}
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value || 'null'}
            checked={filterValue?.includes(option.value) ?? false}
            onCheckedChange={() => handleToggle(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
