import { Loader } from '@/shadcn/components/Loader/Loader';

interface AbsenceDetailLoadingProps {
  tempValue: string;
}

export const AbsenceDetailLoading = ({
  tempValue,
}: AbsenceDetailLoadingProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="px-3 py-1 bg-muted rounded-md text-sm">
        {tempValue.trim() || '-'}
      </div>
      <Loader className="w-6 h-6" />
    </div>
  );
};
