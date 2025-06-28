import API from '@/api/apiClient';
import type { Breed } from '../../interfaces/breed';
import type { Animal } from '../../interfaces/animalType';

export const getBreeds = async (animalType: Animal) => {
  const animalPath = `${animalType}s`;

  const { data } = await API.get<Breed[]>(`/${animalPath}/breeds`);

  const sortedBreeds = data.sort((a, b) =>
    a.value.localeCompare(b.value, 'ca', { sensitivity: 'base' })
  );

  return { breeds: sortedBreeds };
};
