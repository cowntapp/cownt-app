import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalPath } from '../../interfaces/animalType';
import type { BreedFormData } from '../schemas/breedSchema';
import type { Breed } from '../interface/breed';

export const editBreed = async (
  animalType: AnimalPath,
  breedId: string,
  data: BreedFormData
) => {
  const response = await ANIMAL_API.patch<Breed>(
    `/${animalType}/breeds/${breedId}`,
    data
  );

  return response.data;
};
