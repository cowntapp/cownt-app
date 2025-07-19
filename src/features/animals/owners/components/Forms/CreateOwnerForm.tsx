import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { useCreateOwner } from '../../hooks/useCreateOwner';
import { OwnerForm } from './components/OnwerForm';

interface CreateOwnerFormProps {
  workspace: AnimalPath;
}
export const CreateOwnerForm = ({ workspace }: CreateOwnerFormProps) => {
  const { createOwnerMutation } = useCreateOwner(workspace);

  return (
    <OwnerForm
      onSubmit={createOwnerMutation.createOwner}
      isMutating={createOwnerMutation.isPending}
      submitLabel="Crear Propietari"
    />
  );
};
