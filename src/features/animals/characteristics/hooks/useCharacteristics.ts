import { useQuery } from '@tanstack/react-query';
import type { AnimalPath } from '../../interfaces/animalType';
import { getCharacteristics } from '../actions/getCharacteristics';

export const useCharacteristics = (animalPath: AnimalPath) => {
  const characteristicsQuery = useQuery({
    queryKey: [animalPath, 'characteristics'],
    queryFn: () => getCharacteristics(animalPath),
  });

  return {
    characteristicsQuery: {
      characteristics: characteristicsQuery.data?.characteristics,
      ...characteristicsQuery,
    },
  };
};
