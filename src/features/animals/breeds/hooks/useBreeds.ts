import { useQuery } from '@tanstack/react-query';
import type { AnimalPath } from '../../interfaces/animalType';
import { getBreeds } from '../actions/getBreeds';

export const useBreeds = (animalPath: AnimalPath) => {
  const breedsQuery = useQuery({
    queryKey: [animalPath, 'breeds'],
    queryFn: () => getBreeds(animalPath),
  });

  return { breedsQuery: { ...breedsQuery, breeds: breedsQuery.data?.breeds } };
};
