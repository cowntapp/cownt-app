import { TypoH2 } from '@/shadcn/components/typography/TypoH2';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { BadgeCheck } from 'lucide-react';
import { ABSENCE } from '../../consts/animal.consts';
import { useState, useEffect, useCallback } from 'react';
import {
  StatusDisplay,
  StatusEdit,
  StatusLoading,
  AbsenceDetailSection,
} from './components';

interface StatusCardProps {
  absence: ABSENCE | null;
  absenceDetail: string | null;
  onEditAbsence?: (absence: ABSENCE | null) => void;
  onEditAbsenceDetail?: (absenceDetail: string | null) => void;
  isEditingAbsence?: boolean;
  isEditingAbsenceDetail?: boolean;
}

export const StatusCard = ({
  absence,
  absenceDetail,
  onEditAbsence,
  onEditAbsenceDetail,
  isEditingAbsence,
  isEditingAbsenceDetail,
}: StatusCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState<ABSENCE | null>(absence);

  // Reset temp value when absence changes
  useEffect(() => {
    setTempValue(absence);
  }, [absence]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setTempValue(absence);
  }, [absence]);

  // Handle escape key to cancel editing
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEditing) {
        handleCancel();
      }
    };

    if (isEditing) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isEditing, handleCancel]);

  const handleEdit = () => {
    setIsEditing(true);
    setTempValue(absence);
  };

  const handleConfirm = () => {
    if (onEditAbsence && tempValue !== absence) {
      onEditAbsence(tempValue);
    }
    setIsEditing(false);
  };

  const hasChanges = tempValue !== absence;
  const shouldShowAbsenceDetail = absenceDetail !== null || absence !== null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-x-3">
          <BadgeCheck />
          <TypoH2>Estat</TypoH2>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col gap-y-4">
          <div>
            <div className="flex items-center gap-x-3">
              {!isEditing ? (
                <StatusDisplay
                  absence={absence}
                  onEdit={handleEdit}
                  isEditingAbsence={isEditingAbsence}
                />
              ) : (
                <>
                  {isEditingAbsence ? (
                    <StatusLoading tempValue={tempValue} />
                  ) : (
                    <StatusEdit
                      tempValue={tempValue}
                      onValueChange={setTempValue}
                      onConfirm={handleConfirm}
                      onCancel={handleCancel}
                      hasChanges={hasChanges}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          {shouldShowAbsenceDetail && (
            <AbsenceDetailSection
              label="Detall de l'absència"
              absenceDetail={absenceDetail}
              absence={absence}
              onEditAbsenceDetail={onEditAbsenceDetail}
              isEditingAbsenceDetail={isEditingAbsenceDetail}
              placeholder="Descriu motiu d'absència"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
