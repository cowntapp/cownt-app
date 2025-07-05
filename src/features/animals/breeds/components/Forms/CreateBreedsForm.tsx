import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { BreedsForm } from './components/BreedsForm';
import { useCreateBreed } from '../../hooks/useCreateBreed';

interface CreateBreedsFormProps {
  workspace: AnimalPath;
}

export const CreateBreedsForm = ({ workspace }: CreateBreedsFormProps) => {
  const { createBreedMutation } = useCreateBreed(workspace);

  return (
    <BreedsForm
      animalType={workspace}
      onSubmit={createBreedMutation.createBreed}
      isMutating={createBreedMutation.isPending}
      submitLabel="Crear Raça"
    />
  );
};
