import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/shadcn/components/ui/button';
import { Edit } from 'lucide-react';
import { DetailsLoading } from './DetailsLoading';
import { validateDeathDate } from '@/features/animals/schemas/dateValidation';
import { DeathDateDisplay } from './DeathDateDisplay';
import { DeathDateEdit } from './DeathDateEdit';

interface DeathDateSectionProps {
  deathDate: string | null;
  onEditDeathDate?: (deathDate: string | null) => void;
  isEditingDeathDate?: boolean;
}

export const DeathDateSection = ({
  deathDate,
  onEditDeathDate,
  isEditingDeathDate,
}: DeathDateSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState<string>(deathDate || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Reset temp value when value changes
  useEffect(() => {
    setTempValue(deathDate || '');
    setValidationError(null);
  }, [deathDate]);

  // Validate input on change
  const handleInputChange = (value: string) => {
    setTempValue(value);

    // Validate input
    const validation = validateDeathDate(value);
    setValidationError(validation.isValid ? null : validation.error ?? null);
  };

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setTempValue(deathDate || '');
    setValidationError(null);
  }, [deathDate]);

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
    setTempValue(deathDate || '');
    setValidationError(null);
  };

  const handleConfirm = () => {
    // Validate before confirming
    const validation = validateDeathDate(tempValue);
    console.log(tempValue);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Error de validació');
      return;
    }

    if (onEditDeathDate) {
      const newDetails = tempValue.trim() === '' ? null : tempValue.trim();
      console.log(newDetails);
      if (newDetails !== deathDate) {
        onEditDeathDate(newDetails);
      }
    }
    setIsEditing(false);
    setValidationError(null);
  };

  const hasChanges = tempValue.trim() !== (deathDate || '');
  const hasValidationError = validationError !== null;

  return (
    <div>
      <div className="flex items-center gap-2">
        <TypoMuted>Data de mort</TypoMuted>
      </div>
      <div className="flex items-center gap-x-2">
        {!isEditing ? (
          <>
            <DeathDateDisplay deathDate={deathDate} />
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              disabled={isEditingDeathDate}
            >
              <Edit className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            {isEditingDeathDate ? (
              <DetailsLoading tempValue={tempValue} />
            ) : (
              <DeathDateEdit
                tempValue={tempValue}
                onValueChange={handleInputChange}
                hasChanges={hasChanges}
                hasValidationError={hasValidationError}
                validationError={validationError}
                onSave={handleConfirm}
                onCancel={handleCancel}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
