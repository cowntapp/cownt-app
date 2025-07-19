import { useQuery } from '@tanstack/react-query';
import { getOwners } from '../actions/getOwners';

export const useOwners = () => {
  const ownersQuery = useQuery({
    queryKey: ['owners'],
    queryFn: () => getOwners(),
  });

  return {
    ownersQuery: { ...ownersQuery, owners: ownersQuery.data?.owners },
  };
};
