import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { useLocation } from 'react-router';
import { useEditOwner } from '../../hooks/useEditOwner';
import type { OwnerFormData } from '../../schemas/ownerSchema';
import { OwnerForm } from './components/OnwerForm';

interface EditOwnerFormProps {
  animalType: AnimalPath;
}

export const EditOwnerForm = ({ animalType }: EditOwnerFormProps) => {
  const location = useLocation();
  const { owner } = location.state || {};
  const { editOwnerMutation } = useEditOwner(animalType);

  const onSubmit = (data: OwnerFormData) => {
    editOwnerMutation.editOwner({ ownerId: owner.id, data });
  };

  return (
    <>
      <OwnerForm
        defaultValues={owner}
        isMutating={editOwnerMutation.isPending}
        submitLabel="Actualitzar Propietari"
        onSubmit={onSubmit}
      />
    </>
  );
};
