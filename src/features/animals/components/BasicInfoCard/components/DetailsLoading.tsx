import { Loader } from '@/shadcn/components/Loader/Loader';

interface DetailsLoadingProps {
  tempValue: string;
}

export const DetailsLoading = ({ tempValue }: DetailsLoadingProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="px-3 py-1 bg-muted rounded-md text-sm">
        {tempValue || '-'}
      </div>
      <Loader className="w-6 h-6" />
    </div>
  );
};
