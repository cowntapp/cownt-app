import { useState } from 'react';
import { type SortType, StatisticsSorter } from './components/StatisticsSorter';
import { StatisticsListContent } from './components/StatisticsListContent';

interface Animal {
  id: string;
  shortCode: string;
  longCode: string;
  birthDate: string | null;
  birthAverageDays: number | null;
  lastIntervalDays: number | null;
}

interface StatisticsListProps {
  animals: Animal[];
  workspace: 'cows' | 'sheeps';
}

export const StatisticsList = ({ animals, workspace }: StatisticsListProps) => {
  const [showSorter, setShowSorter] = useState(false);
  const [sortType, setSortType] = useState<SortType>('avg-worst');

  return (
    <>
      <StatisticsSorter
        currentSort={sortType}
        onSortChange={setSortType}
        showSorter={showSorter}
        onShowSorterChange={setShowSorter}
      />
      <StatisticsListContent
        animals={animals}
        sortType={sortType}
        workspace={workspace}
      />
    </>
  );
};
