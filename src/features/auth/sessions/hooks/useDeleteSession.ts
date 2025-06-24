import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSession } from '../actions/deleteSession';
import { SESSIONS_KEY } from './useSessions';
// import type { Session } from '../../interfaces/Auth';
import { toast } from 'sonner';

export const useDeleteSession = (sessionId: string) => {
  const queryClient = useQueryClient();

  const { data, mutate, ...rest } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [SESSIONS_KEY] }),
    onError: () => {
      toast.error('There was an error deleting the session');
    },
  });

  const deleteSessionMutation = { message: data, delete: mutate, ...rest };

  return { deleteSessionMutation };
};
