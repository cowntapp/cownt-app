import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalPath } from '../../interfaces/animalType';
import type { CharacteristicFormData } from '../schemas/characteristicSchema';
import type { Characteristic } from '../interface/characteristic';

export const editCharacteristic = async (
  animalType: AnimalPath,
  characteristicId: string,
  data: CharacteristicFormData
) => {
  const response = await ANIMAL_API.patch<Characteristic>(
    `/${animalType}/characteristics/${characteristicId}`,
    data
  );

  return response.data;
};
