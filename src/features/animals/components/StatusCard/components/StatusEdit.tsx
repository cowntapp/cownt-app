import { Button } from '@/shadcn/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import { Check, DollarSign, X, Save, XCircle, ChevronDown } from 'lucide-react';
import { ABSENCE } from '../../../consts/animal.consts';
import { i18n_absenceLabels } from '@/shared/translations/translations';

interface StatusEditProps {
  tempValue: ABSENCE | null;
  onValueChange: (value: ABSENCE | null) => void;
  onConfirm: () => void;
  onCancel: () => void;
  hasChanges: boolean;
}

export const StatusEdit = ({
  tempValue,
  onValueChange,
  onConfirm,
  onCancel,
  hasChanges,
}: StatusEditProps) => {
  const getAbsenceLabel = (value: ABSENCE | null) => {
    if (value === null) return 'Present';
    return i18n_absenceLabels[value];
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="min-w-[120px] justify-between"
          >
            {getAbsenceLabel(tempValue)}
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => onValueChange(null)}
            className="flex items-center gap-x-2"
          >
            <Check className="w-4 h-4" />
            Present
          </DropdownMenuItem>
          {Object.values(ABSENCE).map((absenceValue) => (
            <DropdownMenuItem
              key={absenceValue}
              onClick={() => onValueChange(absenceValue)}
              className="flex items-center gap-x-2"
            >
              {absenceValue === ABSENCE.SOLD ? (
                <DollarSign className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
              {i18n_absenceLabels[absenceValue]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="outline"
        size="sm"
        onClick={onConfirm}
        disabled={!hasChanges}
      >
        <Save className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onCancel}
      >
        <XCircle className="w-4 h-4" />
      </Button>
    </>
  );
};
