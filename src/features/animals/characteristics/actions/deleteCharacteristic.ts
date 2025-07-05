import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalPath } from '../../interfaces/animalType';
import type { Characteristic } from '../interface/characteristic';

export const deleteCharacteristic = async (
  animalType: AnimalPath,
  characteristicId: string
) => {
  const response = await ANIMAL_API.delete<Characteristic>(
    `/${animalType}/characteristics/${characteristicId}`
  );

  return response.data;
};
