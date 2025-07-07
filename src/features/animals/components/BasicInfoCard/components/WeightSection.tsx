import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { useState, useEffect, useCallback } from 'react';
import { validateWeight } from '../../../schemas/weightValidation';
import { WeightDisplay } from './WeightDisplay';
import { WeightEdit } from './WeightEdit';
import { WeightLoading } from './WeightLoading';

interface WeightSectionProps {
  weight: string | null;
  onEditWeight?: (weight: string | null) => void;
  isEditingWeight?: boolean;
}

export const WeightSection = ({
  weight,
  onEditWeight,
  isEditingWeight,
}: WeightSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState<string>(weight || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Reset temp value when weight changes
  useEffect(() => {
    setTempValue(weight || '');
    setValidationError(null);
  }, [weight]);

  // Validate input on change
  const handleInputChange = (value: string) => {
    setTempValue(value);

    // Validate input
    const validation = validateWeight(value);
    setValidationError(validation.isValid ? null : validation.error || null);
  };

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setTempValue(weight || '');
    setValidationError(null);
  }, [weight]);

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
    setTempValue(weight || '');
    setValidationError(null);
  };

  const handleConfirm = () => {
    // Validate before confirming
    const validation = validateWeight(tempValue);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Error de validació');
      return;
    }

    if (onEditWeight) {
      const newWeight = tempValue.trim() === '' ? null : tempValue.trim();
      if (newWeight !== weight) {
        onEditWeight(newWeight);
      }
    }
    setIsEditing(false);
    setValidationError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  const hasChanges = tempValue.trim() !== (weight || '');
  const hasValidationError = validationError !== null;

  return (
    <div>
      <TypoMuted>Pes</TypoMuted>
      <div className="flex items-center gap-x-2">
        {!isEditing ? (
          <WeightDisplay
            weight={weight}
            onEdit={handleEdit}
            isEditingWeight={isEditingWeight}
          />
        ) : (
          <>
            {isEditingWeight ? (
              <WeightLoading tempValue={tempValue} />
            ) : (
              <WeightEdit
                tempValue={tempValue}
                onValueChange={handleInputChange}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                onKeyDown={handleKeyDown}
                hasChanges={hasChanges}
                hasValidationError={hasValidationError}
                validationError={validationError}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
