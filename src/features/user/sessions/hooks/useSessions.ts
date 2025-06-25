import { useQuery } from '@tanstack/react-query';
import { getSessions } from '../actions/getSessions';

export const SESSIONS_KEY = 'sessions';

export const useSessions = () => {
  const { data, ...rest } = useQuery({
    queryKey: [SESSIONS_KEY],
    queryFn: getSessions,
  });

  const sessionQuery = {
    sessions: data,
    ...rest,
  };

  return { sessionQuery };
};
