import { useState, useEffect, useCallback } from 'react';
import { useOwners } from '../../../../owners/hooks/useOwners';
import type { Owner } from '../../../../owners/interface/owner';
import { OwnerDisplay } from './OwnerDisplay';
import { OwnerEdit } from './OwnerEdit';
import { OwnerLoading } from './OwnerLoading';

interface OwnerSectionProps {
  owner: Owner;
  onEditOwner?: (ownerId: string) => void;
  isEditingOwner?: boolean;
}

export const OwnerSection = ({
  owner,
  onEditOwner,
  isEditingOwner,
}: OwnerSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempOwnerId, setTempOwnerId] = useState<string>(owner.id);

  // Get available owners
  const { ownersQuery } = useOwners();

  // Reset temp value when owner changes
  useEffect(() => {
    setTempOwnerId(owner.id);
  }, [owner.id]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setTempOwnerId(owner.id);
  }, [owner.id]);

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
    setTempOwnerId(owner.id);
  };

  const handleOwnerChange = (ownerId: string) => {
    setTempOwnerId(ownerId);
  };

  const handleConfirm = () => {
    if (onEditOwner && tempOwnerId !== owner.id) {
      onEditOwner(tempOwnerId);
    }
    setIsEditing(false);
  };

  const hasChanges = tempOwnerId !== owner.id;

  if (ownersQuery.isLoading) {
    return <div>Carregant propietaris...</div>;
  }

  if (ownersQuery.isError) {
    return <div>Error carregant propietaris</div>;
  }

  const availableOwners = ownersQuery.owners || [];

  return (
    <div className="flex items-start gap-x-2">
      {!isEditing ? (
        <OwnerDisplay
          owner={owner}
          onEdit={handleEdit}
          isEditing={isEditingOwner}
        />
      ) : (
        <>
          {isEditingOwner ? (
            <OwnerLoading
              tempOwnerId={tempOwnerId}
              availableOwners={availableOwners}
            />
          ) : (
            <OwnerEdit
              availableOwners={availableOwners}
              selectedOwnerId={tempOwnerId}
              onOwnerChange={handleOwnerChange}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              hasChanges={hasChanges}
            />
          )}
        </>
      )}
    </div>
  );
};
