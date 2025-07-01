import { useQuery } from '@tanstack/react-query';
import type { AnimalPath } from '../interfaces/animalType';
import { getAnimalById } from '../actions/getAnimalById';

export const useAnimal = (animalType: AnimalPath, id: string) => {
  const animalQuery = useQuery({
    queryKey: [animalType, id],
    queryFn: () => getAnimalById(animalType, id),
  });

  return { animalQuery: { animal: animalQuery.data, ...animalQuery } };
};
