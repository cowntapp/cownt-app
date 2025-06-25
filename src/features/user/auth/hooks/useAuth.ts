import { useQuery } from '@tanstack/react-query';
import { getUser } from '../actions/getUser';

export const AUTH = 'auth';

export const useAuth = (opts = {}) => {
  const userAuthQuery = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    ...opts,
  });

  return { userAuthQuery };
};
