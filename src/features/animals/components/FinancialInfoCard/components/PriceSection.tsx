import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { useState, useEffect, useCallback } from 'react';
import { validatePrice } from '../../../schemas/priceValidation';
import { PriceDisplay } from './PriceDisplay';
import { PriceEdit } from './PriceEdit';
import { PriceLoading } from './PriceLoading';

interface PriceSectionProps {
  label: string;
  price: number | null;
  onEditPrice?: (price: number | null) => void;
  isEditingPrice?: boolean;
  placeholder: string;
}

export const PriceSection = ({
  label,
  price,
  onEditPrice,
  isEditingPrice,
  placeholder,
}: PriceSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState<string>(price?.toString() || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Reset temp value when price changes
  useEffect(() => {
    setTempValue(price?.toString() || '');
    setValidationError(null);
  }, [price]);

  // Validate input on change
  const handleInputChange = (value: string) => {
    setTempValue(value);

    // Validate input
    const validation = validatePrice(value);
    setValidationError(validation.isValid ? null : validation.error || null);
  };

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setTempValue(price?.toString() || '');
    setValidationError(null);
  }, [price]);

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
    setTempValue(price?.toString() || '');
    setValidationError(null);
  };

  const handleConfirm = () => {
    // Validate before confirming
    const validation = validatePrice(tempValue);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Error de validació');
      return;
    }

    if (onEditPrice) {
      const newPrice = tempValue.trim() === '' ? null : parseInt(tempValue);
      if (newPrice !== price) {
        onEditPrice(newPrice);
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

  const hasChanges = tempValue.trim() !== (price?.toString() || '');
  const hasValidationError = validationError !== null;

  return (
    <div>
      <TypoMuted>{label}</TypoMuted>
      <div className="flex items-center gap-x-2">
        {!isEditing ? (
          <PriceDisplay
            price={price}
            onEdit={handleEdit}
            isEditing={isEditingPrice}
          />
        ) : (
          <>
            {isEditingPrice ? (
              <PriceLoading tempValue={tempValue} />
            ) : (
              <PriceEdit
                tempValue={tempValue}
                onValueChange={handleInputChange}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                onKeyDown={handleKeyDown}
                hasChanges={hasChanges}
                hasValidationError={hasValidationError}
                validationError={validationError}
                placeholder={placeholder}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
