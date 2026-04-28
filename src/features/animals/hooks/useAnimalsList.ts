import type { AnimalPath } from '../interfaces/animalType';
import { getAnimalsList } from '../actions/getAnimalsList';
import { useQuery } from '@tanstack/react-query';

export const useAnimalsList = (workspace: AnimalPath) => {
  const animalsListQuery = useQuery({
    queryKey: [workspace, 'list'],
    queryFn: () => getAnimalsList(workspace),
  });

  return {
    animalsListQuery: {
      animals: animalsListQuery.data?.animalsList,
      ...animalsListQuery,
    },
  };
};
