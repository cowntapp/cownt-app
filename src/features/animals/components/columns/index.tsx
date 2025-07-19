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
  createOwnerColumn,
  createSalePriceColumn,
  createSexColumn,
  createShortCodeColumn,
} from './configs';
import type { AnimalColumnConfig } from './types';
import type { Owner } from '../../owners/interface/owner';

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
  owners: Owner[];
  breeds: Breed[];
  characteristics: Characteristic[];
  workspace: AnimalPath;
}

export const animalColumns = ({
  owners,
  breeds,
  characteristics,
  workspace,
}: AnimalColumnsProps): AnimalColumnConfig[] => [
  createSexColumn({ workspace }),
  createLongCodeColumn(),
  createShortCodeColumn({ workspace }),
  createOwnerColumn({ owners }),
  createBreedColumn({ breeds }),
  createBirthDateColumn(),
  createOriginColumn(),
  createChildrenColumn(),
  createBuyPriceColumn(),
  createSalePriceColumn(),
  createCharacteristicsColumn({ characteristics }),
  createAbsenceColumn(),
];
