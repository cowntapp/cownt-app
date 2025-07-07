import { Button } from '@/shadcn/components/ui/button';
import { Edit, Check, DollarSign, X, Info } from 'lucide-react';
import { ABSENCE } from '../../../consts/animal.consts';
import { i18n_absenceLabels } from '@/shared/translations/translations';
import { ChipWithNullCell } from '../../columns/shared/cells';

interface StatusDisplayProps {
  absence: ABSENCE | null;
  onEdit: () => void;
  isEditingAbsence?: boolean;
}

export const StatusDisplay = ({
  absence,
  onEdit,
  isEditingAbsence,
}: StatusDisplayProps) => {
  return (
    <>
      <ChipWithNullCell
        value={absence}
        nullConfig={{
          label: 'Present',
          icon: Check,
          variant: 'default',
        }}
        valueConfig={{
          [ABSENCE.SOLD]: {
            label: i18n_absenceLabels[ABSENCE.SOLD],
            icon: DollarSign,
            className:
              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
          },
          [ABSENCE.DEAD]: {
            label: i18n_absenceLabels[ABSENCE.DEAD],
            icon: X,
            className:
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
          },
        }}
        defaultIcon={Info}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
        disabled={isEditingAbsence}
      >
        <Edit className="w-4 h-4" />
      </Button>
    </>
  );
};
