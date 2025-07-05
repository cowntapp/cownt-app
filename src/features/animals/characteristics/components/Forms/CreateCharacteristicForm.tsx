import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { CharacteristicsForm } from './components/CharacteristicsForm';
import { useCreateCharacteristic } from '../../hooks/useCreateCharacteristic';

interface CreateBreedsFormProps {
  workspace: AnimalPath;
}

export const CreateCharacteristicForm = ({
  workspace,
}: CreateBreedsFormProps) => {
  const { createCharacteristicMutation } = useCreateCharacteristic(workspace);

  return (
    <CharacteristicsForm
      animalType={workspace}
      onSubmit={createCharacteristicMutation.createCharacteristic}
      isMutating={createCharacteristicMutation.isPending}
      submitLabel="Crear Raça"
    />
  );
};
