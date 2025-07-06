import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalRaw } from '../interfaces/animal';
import type { AnimalPath } from '../interfaces/animalType';

export const deleteAnimal = async (
  animalType: AnimalPath,
  animalId: string
) => {
  const response = await ANIMAL_API.delete<AnimalRaw>(
    `/${animalType}/${animalId}`
  );

  return response.data;
};
