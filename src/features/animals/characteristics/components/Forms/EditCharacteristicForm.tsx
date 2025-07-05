import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { useLocation } from 'react-router';
import { useEditCharacteristic } from '../../hooks/useEditCharacteristic';
import type { CharacteristicFormData } from '../../schemas/characteristicSchema';
import { CharacteristicsForm } from './components/CharacteristicsForm';

interface EditCharacteristicFormProps {
  animalType: AnimalPath;
}

export const EditCharacteristicForm = ({
  animalType,
}: EditCharacteristicFormProps) => {
  const location = useLocation();
  const { characteristic } = location.state || {};
  const { editCharacteristicMutation } = useEditCharacteristic(animalType);

  const onSubmit = (data: CharacteristicFormData) => {
    editCharacteristicMutation.editCharacteristic({
      characteristicId: characteristic.id,
      data,
    });
  };

  return (
    <CharacteristicsForm
      animalType={animalType}
      defaultValues={characteristic}
      isMutating={editCharacteristicMutation.isPending}
      submitLabel="Actualitzar Característica"
      onSubmit={onSubmit}
    />
  );
};
