import { ANIMAL_API } from '@/api/apiClient';
import type { Breed } from '../interface/breed';
import type { AnimalPath } from '../../interfaces/animalType';

export const getBreeds = async (animalPath: AnimalPath) => {
  const { data } = await ANIMAL_API.get<Breed[]>(`/${animalPath}/breeds`);

  const sortedBreeds = data.sort((a, b) =>
    a.value.localeCompare(b.value, 'ca', { sensitivity: 'base' })
  );

  return { breeds: sortedBreeds };
};
