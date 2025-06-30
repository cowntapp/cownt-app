import { LoginForm } from '@/features/user/login/LoginForm';
import type { LoginUserRequest } from '@/features/user/interfaces/Auth';
import { useLogin } from '@/features/user/login/hooks/useLogin';
import { useAuth } from '@/features/user/auth/hooks/useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const Login = () => {
  const navigate = useNavigate();
  const { userAuthQuery } = useAuth();

  useEffect(() => {
    if (userAuthQuery.data && userAuthQuery.isSuccess) {
      // If already authenticated, always redirect to dashboard
      // TODO: make it to redirect to landing (/) (when implemented)
      navigate('/cows', { replace: true });
    }
  }, [userAuthQuery, navigate]);

  const { loginMutation } = useLogin();

  const handleSubmit = (user: LoginUserRequest) => {
    loginMutation.mutate(user);
  };

  return (
    <div className="w-full h-full max-w-sm m-auto">
      <LoginForm
        isPending={loginMutation.isPending}
        onUserSubmit={handleSubmit}
      />
    </div>
  );
};
