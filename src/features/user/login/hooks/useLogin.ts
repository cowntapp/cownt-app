import type { ApiError } from '@/api/lib/ApiError';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { login } from '../actions/login';
import { menuData } from '@/config/data/appConfigData';
import { HAS_WORKSPACES } from '@/config/consts/configConsts';

export const useLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Redirect to previous path if exists, otherwise to /dashboard
      const redirectTo =
        location.state &&
        typeof location.state === 'object' &&
        location.state.from
          ? location.state.from
          : HAS_WORKSPACES
          ? `${menuData.workspaces![0].url}`
          : '/dashboard';
      navigate(redirectTo, { replace: true });
    },
    onError: (error: ApiError) => {
      const message =
        error.status && error.status !== 500
          ? error.message
          : 'Something went wrong';
      toast.error(message);
    },
  });

  return { loginMutation };
};
