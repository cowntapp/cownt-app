import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  type Table as TableType,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shadcn/components/ui/table';
import { useState } from 'react';
import { Input } from './input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import {
  i18n_cowProps,
  type CowRawKeys,
} from '@/shared/translations/translations';
import { FilterX, Menu } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
}
interface DataTableScrollableProps<TData, TValue>
  extends DataTableProps<TData, TValue> {
  filterColumnId: string;
  filterInputPlaceholder: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  className,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={`rounded-md border my-4 overflow-hidden ${className}`}>
      <Table>
        <TableContent
          table={table}
          columns={columns}
        />
      </Table>
    </div>
  );
}

export function DataTableScrollable<TData, TValue>({
  columns,
  data,
  filterColumnId,
  filterInputPlaceholder,
  className,
}: DataTableScrollableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  const isTableFilteredOrSorted =
    table.getState().columnFilters.length > 0 ||
    table.getState().sorting.length > 0;

  return (
    <>
      <div className="flex items-center gap-x-4 py-2 mt-4">
        <Input
          className="max-w-sm"
          placeholder={filterInputPlaceholder}
          value={
            (table.getColumn(filterColumnId)?.getFilterValue() as string) ?? ''
          }
          onChange={(e) =>
            table.getColumn(filterColumnId)?.setFilterValue(e.target.value)
          }
        />
        <div className="ml-auto flex gap-x-4">
          {isTableFilteredOrSorted && (
            <Button
              onClick={() => {
                table.resetSorting();
                table.resetColumnFilters();
              }}
            >
              <span className="sr-only sm:not-sr-only">Esborra Filtres</span>
              <FilterX className="block sm:hidden" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <span className="sr-only sm:not-sr-only">Columnes</span>
                <Menu className="block sm:hidden" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {i18n_cowProps[column.id as CowRawKeys]}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className={`rounded-md border my-2 ${className}`}>
        <Table containerClassName="max-h-[500px]">
          <TableContent
            table={table}
            columns={columns}
          />
        </Table>
      </div>
    </>
  );
}

function TableContent<TData, TValue>({
  table,
  columns,
}: {
  table: TableType<TData>;
  columns: ColumnDef<TData, TValue>[];
}) {
  return (
    <>
      <TableHeader className="sticky top-0 bg-background/70 backdrop-blur-md">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center"
            >
              No s'ha trobat cap resultat
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
}
