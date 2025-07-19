import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { Button } from '@/shadcn/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface OwnersHeaderProps {
  isFetching: boolean;
  onRefetch: () => void;
}

export const OwnersHeader = ({ isFetching, onRefetch }: OwnersHeaderProps) => {
  return (
    <div className="flex items-center gap-x-4">
      <TypoH1>Propietaris</TypoH1>
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
