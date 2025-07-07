import { Loader } from '@/shadcn/components/Loader/Loader';
import { formatWeight } from '@/shared/utils/formatWeight';

interface WeightLoadingProps {
  tempValue: string;
}

export const WeightLoading = ({ tempValue }: WeightLoadingProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="px-3 py-1 bg-muted rounded-md text-sm">
        {formatWeight(tempValue) || '-'}
      </div>
      <Loader className="w-6 h-6" />
    </div>
  );
};
