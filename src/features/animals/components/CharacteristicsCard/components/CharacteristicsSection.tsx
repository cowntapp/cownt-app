import { useState, useEffect, useCallback } from 'react';
import { validateCharacteristics } from '../../../schemas/characteristicsValidation';
import { useCharacteristics } from '../../../characteristics/hooks/useCharacteristics';
import type { AnimalPath } from '../../../interfaces/animalType';
import type { Characteristic } from '../../../characteristics/interface/characteristic';
import { CharacteristicsDisplay } from './CharacteristicsDisplay';
import { CharacteristicsEdit } from './CharacteristicsEdit';
import { CharacteristicsLoading } from './CharacteristicsLoading';

interface CharacteristicsSectionProps {
  characteristics: Characteristic[];
  workspace: AnimalPath;
  onEditCharacteristics?: (characteristics: string[]) => void;
  isEditingCharacteristics?: boolean;
}

export const CharacteristicsSection = ({
  characteristics,
  workspace,
  onEditCharacteristics,
  isEditingCharacteristics,
}: CharacteristicsSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempCharacteristics, setTempCharacteristics] = useState<string[]>(
    characteristics.map((c) => c.id)
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  // Get available characteristics
  const { characteristicsQuery } = useCharacteristics(workspace);

  // Reset temp value when characteristics change
  useEffect(() => {
    setTempCharacteristics(characteristics.map((c) => c.id));
    setValidationError(null);
  }, [characteristics]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setTempCharacteristics(characteristics.map((c) => c.id));
    setValidationError(null);
  }, [characteristics]);

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
    setTempCharacteristics(characteristics.map((c) => c.id));
    setValidationError(null);
  };

  const handleToggleCharacteristic = (characteristicId: string) => {
    setTempCharacteristics((prev) => {
      const newCharacteristics = prev.includes(characteristicId)
        ? prev.filter((id) => id !== characteristicId)
        : [...prev, characteristicId];

      // Validate immediately
      const validation = validateCharacteristics(newCharacteristics);
      setValidationError(validation.isValid ? null : validation.error || null);

      return newCharacteristics;
    });
  };

  const handleConfirm = () => {
    // Validate before confirming
    const validation = validateCharacteristics(tempCharacteristics);
    if (!validation.isValid) {
      setValidationError(validation.error || 'Error de validació');
      return;
    }

    if (onEditCharacteristics) {
      const currentIds = characteristics.map((c) => c.id);
      // Only call if there are actual changes
      if (
        JSON.stringify(tempCharacteristics.sort()) !==
        JSON.stringify(currentIds.sort())
      ) {
        onEditCharacteristics(tempCharacteristics);
      }
    }
    setIsEditing(false);
    setValidationError(null);
  };

  const currentIds = characteristics.map((c) => c.id);
  const hasChanges =
    JSON.stringify(tempCharacteristics.sort()) !==
    JSON.stringify(currentIds.sort());
  const hasValidationError = validationError !== null;

  if (characteristicsQuery.isLoading) {
    return <div>Carregant característiques...</div>;
  }

  if (characteristicsQuery.isError) {
    return <div>Error carregant característiques</div>;
  }

  const availableCharacteristics = characteristicsQuery.characteristics || [];

  return (
    <div className="flex items-start gap-x-2">
      {!isEditing ? (
        <CharacteristicsDisplay
          characteristics={characteristics}
          onEdit={handleEdit}
          isEditing={isEditingCharacteristics}
        />
      ) : (
        <>
          {isEditingCharacteristics ? (
            <CharacteristicsLoading
              tempCharacteristics={tempCharacteristics}
              availableCharacteristics={availableCharacteristics}
            />
          ) : (
            <CharacteristicsEdit
              availableCharacteristics={availableCharacteristics}
              selectedCharacteristics={tempCharacteristics}
              onToggleCharacteristic={handleToggleCharacteristic}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              hasChanges={hasChanges}
              hasValidationError={hasValidationError}
              validationError={validationError}
            />
          )}
        </>
      )}
    </div>
  );
};
