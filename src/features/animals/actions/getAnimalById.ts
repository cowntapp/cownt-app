import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalPopulated } from '../interfaces/animal';
import type { AnimalPath } from '../interfaces/animalType';

export const getAnimalById = async (animalType: AnimalPath, id: string) => {
  const response = await ANIMAL_API.get<AnimalPopulated>(
    `/${animalType}/${id}`
  );

  return response.data;
};
