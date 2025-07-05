import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalPath } from '../../interfaces/animalType';
import type { CharacteristicFormData } from '../schemas/characteristicSchema';
import type { Characteristic } from '../interface/characteristic';

export const createCharacteristic = async (
  animalPath: AnimalPath,
  data: CharacteristicFormData
) => {
  const response = await ANIMAL_API.post<Characteristic>(
    `/${animalPath}/characteristics`,
    data
  );

  return response.data;
};
