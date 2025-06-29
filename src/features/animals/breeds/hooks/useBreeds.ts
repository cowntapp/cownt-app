import { useQuery } from '@tanstack/react-query';
import type { AnimalPath } from '../../interfaces/animalType';
import { getBreeds } from '../actions/getBreeds';
import { toast } from 'sonner';
import { useEffect } from 'react';

export const useBreeds = (animalPath: AnimalPath) => {
  const breedsQuery = useQuery({
    queryKey: [animalPath, 'breeds'],
    queryFn: () => getBreeds(animalPath),
  });

  useEffect(() => {
    if (breedsQuery.isError) {
      toast.error('Something went wrong');
    }
  }, [breedsQuery.isError]);

  return { breedsQuery: { ...breedsQuery, breeds: breedsQuery.data?.breeds } };
};
