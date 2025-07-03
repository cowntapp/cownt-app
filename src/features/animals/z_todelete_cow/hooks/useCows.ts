import { useQuery } from '@tanstack/react-query';
import { getCows } from '../actions/getCows';

export const useCows = () => {
  const cowsQuery = useQuery({
    queryKey: ['cows'],
    queryFn: getCows,
  });

  return { cowsQuery: { cows: cowsQuery.data?.cows, ...cowsQuery } };
};
