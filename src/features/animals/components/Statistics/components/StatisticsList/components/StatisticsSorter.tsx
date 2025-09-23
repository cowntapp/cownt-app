import { Button } from '@/shadcn/components/ui/button';

export type SortType = 'avg-best' | 'avg-worst' | 'last-birth' | 'no-birth';

interface StatisticsSorterProps {
  currentSort: SortType;
  onSortChange: (sort: SortType) => void;
  showSorter: boolean;
  onShowSorterChange: (show: boolean) => void;
}

export const StatisticsSorter = ({
  currentSort,
  onSortChange,
  showSorter,
  onShowSorterChange,
}: StatisticsSorterProps) => {
  return (
    <div className="pt-8 pb-4">
      <Button
        variant={showSorter ? 'secondary' : 'default'}
        onClick={() => onShowSorterChange(!showSorter)}
      >
        Ordena
      </Button>
      {showSorter && (
        <div className="bg-secondary/20 p-4 rounded-lg my-2 flex flex-col sm:flex-row gap-2">
          <Button
            variant={currentSort === 'avg-best' ? 'default' : 'secondary'}
            className={currentSort === 'avg-best' ? 'font-bold' : ''}
            onClick={() => onSortChange('avg-best')}
          >
            Millor Mitjana
          </Button>
          <Button
            variant={currentSort === 'avg-worst' ? 'default' : 'secondary'}
            className={currentSort === 'avg-worst' ? 'font-bold' : ''}
            onClick={() => onSortChange('avg-worst')}
          >
            Pitjor Mitjana
          </Button>
          <Button
            variant={currentSort === 'last-birth' ? 'default' : 'secondary'}
            className={currentSort === 'last-birth' ? 'font-bold' : ''}
            onClick={() => onSortChange('last-birth')}
          >
            Últim Part
          </Button>
          <Button
            variant={currentSort === 'no-birth' ? 'default' : 'secondary'}
            className={currentSort === 'no-birth' ? 'font-bold' : ''}
            onClick={() => onSortChange('no-birth')}
          >
            Novelles
          </Button>
        </div>
      )}
    </div>
  );
};
