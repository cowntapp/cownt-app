import { daysToMonths } from '@/features/animals/utils/daysToMonths';
import { type SortType } from './StatisticsSorter';
import { Link } from 'react-router';
import { calculateAge } from '@/features/animals/utils/calculateAge';
import { ArrowUpRightFromSquare, Info } from 'lucide-react';
import { ResponsiveTooltip } from '@/shadcn/components/ui/responsive-tooltip';
import { Button } from '@/shadcn/components/ui/button';
import { Badge } from '@/shadcn/components/ui/badge';

interface Animal {
  id: string;
  shortCode: string;
  longCode: string;
  birthDate: string | null;
  birthAverageDays: number | null;
  lastIntervalDays: number | null;
}

interface StatisticsListContentProps {
  animals: Animal[];
  sortType: SortType;
  workspace: 'cows' | 'sheeps';
}

const sortAnimals = (animals: Animal[], sortType: SortType): Animal[] => {
  return [...animals].sort((a, b) => {
    if (sortType === 'avg-best') {
      if (!a.birthAverageDays) return 1;
      if (!b.birthAverageDays) return -1;
      return a.birthAverageDays - b.birthAverageDays;
    } else if (sortType === 'avg-worst') {
      if (!a.birthAverageDays) return 1;
      if (!b.birthAverageDays) return -1;
      return b.birthAverageDays - a.birthAverageDays;
    } else if (sortType === 'last-birth') {
      if (!a.lastIntervalDays) return 1;
      if (!b.lastIntervalDays) return -1;
      return b.lastIntervalDays - a.lastIntervalDays;
    } else {
      // Para 'no-birth': primero ordenar por si tienen o no lastIntervalDays
      if (!a.lastIntervalDays && b.lastIntervalDays) return -1;
      if (a.lastIntervalDays && !b.lastIntervalDays) return 1;
      // Si ambas tienen o no tienen lastIntervalDays, ordenar por edad (más jóvenes primero)
      if (!a.birthDate || !b.birthDate) return 0;
      return Number(a.birthDate) - Number(b.birthDate);
    }
  });
};

export const StatisticsListContent = ({
  animals,
  sortType,
  workspace,
}: StatisticsListContentProps) => {
  const sortedAnimals = sortAnimals(animals, sortType);

  return (
    <div className="">
      <div className="grid grid-cols-4 gap-x-1 px-2">
        <div>Codi Curt</div>
        <div>
          Edat <span className="inline sm:hidden">(m)</span>
          <span className="hidden sm:inline">(mesos)</span>
        </div>
        <div>
          Mitjana <span className="inline sm:hidden">(d)</span>
          <span className="hidden sm:inline">(dies)</span>
        </div>
        <div>
          <span className="inline sm:hidden">Últ.</span>{' '}
          <span className="hidden sm:inline">Últim</span> Part{' '}
          <span className="inline sm:hidden">(d)</span>{' '}
          <span className="hidden sm:inline">(dies)</span>
        </div>
      </div>
      <div className="flex flex-col space-y-1">
        {sortedAnimals.map((animal) => (
          <div
            key={animal.shortCode}
            className="grid grid-cols-4 gap-x-1 items-center hover:bg-secondary px-2 rounded-sm space-x-4 font-mono text-xs sm:text-sm"
          >
            <div className="flex items-center gap-1">
              <ResponsiveTooltip
                content={animal.longCode}
                contentClassName="font-mono uppercase text-sm font-semibold"
                side="left"
              >
                <Button
                  className="hidden sm:inline"
                  size={'icon'}
                  variant={'ghost'}
                >
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </ResponsiveTooltip>
              <Badge
                asChild
                className="font-mono"
              >
                <Link to={`/${workspace}/${animal.id}`}>
                  {animal.shortCode}
                  <ArrowUpRightFromSquare className="text-muted size-3" />
                </Link>
              </Badge>
            </div>
            <div>
              <span>{calculateAge(animal.birthDate)?.month}</span>{' '}
              <span className="text-sm text-gray-500">
                ({calculateAge(animal.birthDate)?.years}a)
              </span>
            </div>
            <div>
              {animal.birthAverageDays}{' '}
              <span className="text-sm text-gray-500">
                {daysToMonths(animal.birthAverageDays)}
              </span>
            </div>
            <div>
              {animal.lastIntervalDays}{' '}
              <span className="text-sm text-gray-500">
                {daysToMonths(animal.lastIntervalDays)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
