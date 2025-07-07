import { ABSENCE } from '../../../consts/animal.consts';
import { i18n_absenceLabels } from '@/shared/translations/translations';
import { Loader } from '@/shadcn/components/Loader/Loader';

interface StatusLoadingProps {
  tempValue: ABSENCE | null;
}

export const StatusLoading = ({ tempValue }: StatusLoadingProps) => {
  const getAbsenceLabel = (value: ABSENCE | null) => {
    if (value === null) return 'Present';
    return i18n_absenceLabels[value];
  };

  return (
    <div className="flex items-center gap-x-3">
      <div className="px-3 py-1 bg-muted rounded-md text-sm">
        {getAbsenceLabel(tempValue)}
      </div>
      <Loader className="w-8 h-8" />
    </div>
  );
};
