import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalPath } from '../../interfaces/animalType';
import type { Breed } from '../interface/breed';
import type { BreedFormData } from '../schemas/breedSchema';

export const createBreed = async (
  animalPath: AnimalPath,
  data: BreedFormData
) => {
  const response = await ANIMAL_API.post<Breed>(`/${animalPath}/breeds`, data);

  return response.data;
};
