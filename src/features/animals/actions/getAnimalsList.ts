import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalListItem } from '../interfaces/animal';
import type { AnimalPath } from '../interfaces/animalType';

export const getAnimalsList = async (animalType: AnimalPath) => {
  const response = await ANIMAL_API.get<AnimalListItem[]>(
    `/${animalType}/list`,
  );
  return { animalsList: response.data };
};
