import type { FilterFn } from '@tanstack/react-table';
import type { AnimalRaw } from '../../../interfaces/animal';

// Generic filter types
export type FilterType =
  | 'multiselect' // Simple array inclusion check
  | 'multiselect-all' // All values must be present
  | 'custom' // Custom logic
  | 'nullable'; // Handles null values

// 1. Multiselect Filter - Simple inclusion check
export const createMultiselectFilter =
  (): FilterFn<AnimalRaw> => (row, columnId, filterValue) => {
    if (!filterValue || filterValue.length === 0) return true;
    return filterValue.includes(row.getValue(columnId));
  };

// 2. Multiselect All Filter - All selected values must be present in the cell
export const createMultiselectAllFilter =
  (): FilterFn<AnimalRaw> => (row, columnId, filterValue) => {
    if (!filterValue || filterValue.length === 0) return true;
    const values: string[] = row.getValue(columnId);
    return filterValue.every((val: string) => values.includes(val));
  };

// 3. Children Count Filter - Custom logic for counting children
export const childrenFilterOptions = ['0', '1', '2+'];

// Generic count filter that can be configured with different options
export const createCountFilter =
  (
    options: string[],
    getCount: (row: AnimalRaw) => number
  ): FilterFn<AnimalRaw> =>
  (row, _, filterValue) => {
    if (!filterValue || filterValue.length === 0) return true;
    const count = getCount(row.original);

    return filterValue.some((val: string) => {
      const option = options.find((opt) => opt === val);
      if (!option) return false;

      // Parse the option value to determine the logic
      if (option.includes('+')) {
        // Handle "2+" style options
        const minCount = parseInt(option.replace('+', ''));
        return count >= minCount;
      } else {
        // Handle exact count options
        const exactCount = parseInt(option);
        return count === exactCount;
      }
    });
  };

export const createChildrenCountFilter = (): FilterFn<AnimalRaw> =>
  createCountFilter(childrenFilterOptions, (row) => row.children.length);

// 4. Nullable Value Filter - Handles null/undefined values
export const createNullableFilter =
  <T extends string | null>(): FilterFn<AnimalRaw> =>
  (row, columnId, filterValue) => {
    if (!filterValue || filterValue.length === 0) return true;
    const value = row.getValue(columnId);
    return filterValue.some((f: T) =>
      f === null ? value == null : value === f
    );
  };

// 5. Generic Custom Filter Factory
export const createCustomFilter =
  <T = unknown,>(
    logic: (cellValue: T, filterValues: unknown[]) => boolean
  ): FilterFn<AnimalRaw> =>
  (row, columnId, filterValue) => {
    if (!filterValue || filterValue.length === 0) return true;
    const cellValue = row.getValue(columnId) as T;
    return logic(cellValue, filterValue);
  };

// Filter factory - creates appropriate filter based on type
export const createFilter = (
  type: FilterType,
  customLogic?: FilterFn<AnimalRaw>
): FilterFn<AnimalRaw> => {
  switch (type) {
    case 'multiselect':
      return createMultiselectFilter();
    case 'multiselect-all':
      return createMultiselectAllFilter();
    case 'custom':
      return customLogic || createChildrenCountFilter();
    case 'nullable':
      return createNullableFilter();
    default:
      return createMultiselectFilter();
  }
};
