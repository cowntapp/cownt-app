import { ANIMAL_API } from '@/api/apiClient';
import type { Breed } from '../interface/breed';
import type { AnimalPath } from '../../interfaces/animalType';

export const deleteBreed = async (animalType: AnimalPath, breedId: string) => {
  const response = await ANIMAL_API.delete<Breed>(
    `/${animalType}/breeds/${breedId}`
  );

  return response.data;
};
