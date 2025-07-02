import { useQuery } from '@tanstack/react-query';
import type { AnimalPath } from '../interfaces/animalType';
import { getAnimals } from '../actions/getAnimals';

export const useAnimals = (workspace: AnimalPath) => {
  const animalsQuery = useQuery({
    queryKey: [workspace],
    queryFn: () => getAnimals(workspace),
  });

  return {
    animalsQuery: {
      animals: animalsQuery.data,
      ...animalsQuery,
    },
  };
};
