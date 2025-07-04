import { Skeleton } from '@/shadcn/components/ui/skeleton';
import type { Breed } from '../../breeds/interface/breed';
import type { Characteristic } from '../../characteristics/interface/characteristic';
import type { AnimalPath } from '../../interfaces/animalType';

import {
  createAbsenceColumn,
  createBirthDateColumn,
  createBreedColumn,
  createBuyPriceColumn,
  createCharacteristicsColumn,
  createChildrenColumn,
  createLongCodeColumn,
  createOriginColumn,
  createSalePriceColumn,
  createSexColumn,
  createShortCodeColumn,
} from './configs';
import type { AnimalColumnConfig } from './types';

export const loadingAnimalsColumns: AnimalColumnConfig[] = [
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

interface AnimalColumnsProps {
  breeds: Breed[];
  characteristics: Characteristic[];
  workspace: AnimalPath;
}

export const animalColumns = ({
  breeds,
  characteristics,
  workspace,
}: AnimalColumnsProps): AnimalColumnConfig[] => [
  createSexColumn({ workspace }),
  createLongCodeColumn(),
  createShortCodeColumn({ workspace }),
  createBreedColumn({ breeds }),
  createBirthDateColumn(),
  createOriginColumn(),
  createChildrenColumn(),
  createBuyPriceColumn(),
  createSalePriceColumn(),
  createCharacteristicsColumn({ characteristics }),
  createAbsenceColumn(),
];
