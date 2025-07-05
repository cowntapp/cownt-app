import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { BreedsForm } from './components/BreedsForm';
import { useEditBreed } from '../../hooks/useEditBreed';
import { useLocation } from 'react-router';
import type { BreedFormData } from '../../schemas/breedSchema';

interface EditBreedFormProps {
  animalType: AnimalPath;
}

export const EditBreedForm = ({ animalType }: EditBreedFormProps) => {
  const location = useLocation();
  const { breed } = location.state || {};
  const { editBreedMutation } = useEditBreed(animalType);

  const onSubmit = (data: BreedFormData) => {
    editBreedMutation.editBreed({ breedId: breed.id, data });
  };

  return (
    <>
      <BreedsForm
        animalType={animalType}
        defaultValues={breed}
        isMutating={editBreedMutation.isPending}
        submitLabel="Actualitzar Raça"
        onSubmit={onSubmit}
      />
    </>
  );
};
