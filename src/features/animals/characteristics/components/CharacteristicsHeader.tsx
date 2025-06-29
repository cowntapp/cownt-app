import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { Button } from '@/shadcn/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface CharacteristicsHeaderProps {
  isFetching: boolean;
  onRefetch: () => void;
}

export const CharacteristicsHeader = ({
  isFetching,
  onRefetch,
}: CharacteristicsHeaderProps) => {
  return (
    <div className="flex items-center gap-x-4">
      <TypoH1>Característiques</TypoH1>
      <Button
        size={'icon'}
        variant={'ghost'}
        onClick={onRefetch}
      >
        <RefreshCw
          className={`${isFetching && 'animate-spin'} hover:animate-spin`}
        />
      </Button>
    </div>
  );
};
