import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { Button } from '@/shadcn/components/ui/button';
import { Edit, AlertTriangle } from 'lucide-react';
import { ResponsiveTooltip } from '@/shadcn/components/ui/responsive-tooltip';
import { ABSENCE } from '../../../consts/animal.consts';

interface AbsenceDetailDisplayProps {
  absenceDetail: string | null;
  absence: ABSENCE | null;
  onEdit: () => void;
  isEditing?: boolean;
}

export const AbsenceDetailDisplay = ({
  absenceDetail,
  absence,
  onEdit,
  isEditing,
}: AbsenceDetailDisplayProps) => {
  // Detectar inconsistencia: hay detalle pero no hay ausencia
  const hasInconsistency = absenceDetail !== null && absence === null;

  return (
    <>
      <div className="flex items-center gap-x-2">
        <TypoLead className="font-semibold">{absenceDetail || '-'}</TypoLead>
        {hasInconsistency && (
          <ResponsiveTooltip
            content="El detall no correspon amb l'estat actual"
            side="top"
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </ResponsiveTooltip>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
        disabled={isEditing}
      >
        <Edit className="w-4 h-4" />
      </Button>
    </>
  );
};
