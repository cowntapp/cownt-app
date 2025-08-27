import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { useState, useEffect, useCallback } from 'react';
import { DetailsDisplay } from './DetailsDisplay';
import { Button } from '@/shadcn/components/ui/button';
import { Edit, Save, XCircle } from 'lucide-react';
import { DetailsLoading } from './DetailsLoading';
import { DetailsEdit } from './DetailsEdit';

interface DetailsSectionProps {
  details: string | null;
  onEditDetails?: (details: string | null) => void;
  isEditingDetails?: boolean;
}

const validateDetails = (details: string) => {
  return details.trim().length < 255
    ? {
        isValid: true,
      }
    : {
        isValid: false,
        error: 'Has superat el límit de lletres',
      };
};

export const DetailsSection = ({
  details,
  onEditDetails,
  isEditingDetails,
}: DetailsSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState<string>(details || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Reset temp value when weight changes
  useEffect(() => {
    setTempValue(details || '');
    setValidationError(null);
  }, [details]);

  // Validate input on change
  const handleInputChange = (value: string) => {
    setTempValue(value);

    // Validate input
    const validation = validateDetails(value);
    setValidationError(validation.isValid ? null : validation.error ?? null);
  };

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setTempValue(details || '');
    setValidationError(null);
  }, [details]);

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
    setTempValue(details || '');
    setValidationError(null);
  };

  const handleConfirm = () => {
    // Validate before confirming
    const validation = validateDetails(tempValue);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Error de validació');
      return;
    }

    console.log('c');

    if (onEditDetails) {
      console.log('d');
      const newDetails = tempValue.trim() === '' ? null : tempValue.trim();
      if (newDetails !== details) {
        onEditDetails(newDetails);
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

  const hasChanges = tempValue.trim() !== (details || '');
  const hasValidationError = validationError !== null;

  return (
    <div>
      <div className="flex items-center gap-2">
        <TypoMuted>Detall</TypoMuted>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            disabled={isEditingDetails}
          >
            <Edit className="w-4 h-4" />
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleConfirm}
              disabled={!hasChanges || hasValidationError}
            >
              <Save className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              <XCircle className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
      <div className="flex items-center gap-x-2">
        {!isEditing ? (
          <DetailsDisplay details={details} />
        ) : (
          <>
            {isEditingDetails ? (
              <DetailsLoading tempValue={tempValue} />
            ) : (
              <DetailsEdit
                tempValue={tempValue}
                onValueChange={handleInputChange}
                onKeyDown={handleKeyDown}
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
