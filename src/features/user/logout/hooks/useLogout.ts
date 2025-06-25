import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../actions/logout';
import { useNavigate } from 'react-router';
import type { ApiError } from '@/api/lib/ApiError';
import { toast } from 'sonner';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate('/', { replace: true });
    },
    onError: (error: ApiError) => {
      const message =
        error.status && error.status !== 500
          ? error.message
          : 'Something went wrong';
      toast.error(message);
    },
  });
  return { logoutMutation };
};
