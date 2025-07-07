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
import { StatusDisplay, StatusEdit, StatusLoading } from './components';

interface StatusCardProps {
  absence: ABSENCE | null;
  onEditAbsence?: (absence: ABSENCE | null) => void;
  isEditingAbsence?: boolean;
}

export const StatusCard = ({
  absence,
  onEditAbsence,
  isEditingAbsence,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-x-3">
          <BadgeCheck />
          <TypoH2>Estat</TypoH2>
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
