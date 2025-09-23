import { useQuery } from '@tanstack/react-query';
import type { AnimalPath } from '../interfaces/animalType';
import { getStatistics } from '../actions/getStatistics';

// TODO: verificar que no cacheja la resposta i que sigui fresca a cada request

export const useStatistics = (workspace: AnimalPath) => {
  const statisticsQuery = useQuery({
    queryKey: [`${workspace}-statistics`],
    queryFn: () => getStatistics(workspace),
  });

  return statisticsQuery;
};
