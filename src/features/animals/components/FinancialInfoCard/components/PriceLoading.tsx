import { Loader } from '@/shadcn/components/Loader/Loader';
import { getFormattedPriceStringIntl } from '@/shared/utils/formatPrice';

interface PriceLoadingProps {
  tempValue: string;
}

export const PriceLoading = ({ tempValue }: PriceLoadingProps) => {
  const numericValue = tempValue.trim() === '' ? null : parseInt(tempValue);

  return (
    <div className="flex items-center gap-x-2">
      <div className="px-3 py-1 bg-muted rounded-md text-sm">
        {getFormattedPriceStringIntl(numericValue) || '-'}
      </div>
      <Loader className="w-6 h-6" />
    </div>
  );
};
