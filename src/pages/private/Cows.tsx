import { useBreeds } from '@/features/animals/breeds/hooks/useBreeds';
import { useCharacteristics } from '@/features/animals/characteristics/hooks/useCharacteristics';
import {
  cowCowlumns,
  loadingCowsColumns,
} from '@/features/animals/cow/components/columns';
import { useCows } from '@/features/animals/cow/hooks/useCows';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { DataTableScrollable } from '@/shadcn/components/ui/data-table';
import { QueryBoundary } from '@/shared/components/QueryBoundary';

// TODO: Abstract into animals component and reuse for sheeps
export const Cows = () => {
  const { cowsQuery } = useCows();
  const { breedsQuery } = useBreeds('cows');
  const { characteristicsQuery } = useCharacteristics('cows');

  const { breeds = [] } = breedsQuery;
  const { characteristics = [] } = characteristicsQuery;

  return (
    <div className="w-full">
      <TypoH1>Vaques</TypoH1>

      <QueryBoundary
        query={cowsQuery}
        loaderComponent={
          <DataTableScrollable
            filterColumnId="longCode"
            filterInputPlaceholder="Carregant..."
            columns={loadingCowsColumns}
            data={new Array(3)}
          />
        }
      >
        {({ cows }) => (
          <DataTableScrollable
            filterColumnId="longCode"
            filterInputPlaceholder="Filtra per codi..."
            columns={cowCowlumns({ breeds, characteristics })}
            data={cows}
          />
        )}
      </QueryBoundary>
    </div>
  );
};
