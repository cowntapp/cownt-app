import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { useState, useEffect, useCallback } from 'react';
import { AbsenceDetailDisplay } from './AbsenceDetailDisplay';
import { AbsenceDetailEdit } from './AbsenceDetailEdit';
import { AbsenceDetailLoading } from './AbsenceDetailLoading';
import { ABSENCE } from '../../../consts/animal.consts';

interface AbsenceDetailSectionProps {
  label: string;
  absenceDetail: string | null;
  absence: ABSENCE | null;
  onEditAbsenceDetail?: (absenceDetail: string | null) => void;
  isEditingAbsenceDetail?: boolean;
  placeholder: string;
}

export const AbsenceDetailSection = ({
  label,
  absenceDetail,
  absence,
  onEditAbsenceDetail,
  isEditingAbsenceDetail,
  placeholder,
}: AbsenceDetailSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState<string>(absenceDetail || '');

  // Reset temp value when absenceDetail changes
  useEffect(() => {
    setTempValue(absenceDetail || '');
  }, [absenceDetail]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setTempValue(absenceDetail || '');
  }, [absenceDetail]);

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
    setTempValue(absenceDetail || '');
  };

  const handleConfirm = () => {
    if (onEditAbsenceDetail) {
      const newAbsenceDetail =
        tempValue.trim() === '' ? null : tempValue.trim();
      if (newAbsenceDetail !== absenceDetail) {
        onEditAbsenceDetail(newAbsenceDetail);
      }
    }
    setIsEditing(false);
  };

  const handleClear = () => {
    if (onEditAbsenceDetail) {
      onEditAbsenceDetail(null);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  const hasChanges = tempValue.trim() !== (absenceDetail || '');

  return (
    <div>
      <TypoMuted>{label}</TypoMuted>
      <div className="flex items-center gap-x-2">
        {!isEditing ? (
          <AbsenceDetailDisplay
            absenceDetail={absenceDetail}
            absence={absence}
            onEdit={handleEdit}
            isEditing={isEditingAbsenceDetail}
          />
        ) : (
          <>
            {isEditingAbsenceDetail ? (
              <AbsenceDetailLoading tempValue={tempValue} />
            ) : (
              <AbsenceDetailEdit
                tempValue={tempValue}
                onValueChange={setTempValue}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                onClear={handleClear}
                onKeyDown={handleKeyDown}
                hasChanges={hasChanges}
                placeholder={placeholder}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
