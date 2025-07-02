import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalPath } from '../interfaces/animalType';
import type { AnimalRaw } from '../interfaces/animalGeneric';

export const getAnimals = async (animalType: AnimalPath) => {
  const response = await ANIMAL_API.get<AnimalRaw[]>(`/${animalType}/`);
  return response.data;
};
