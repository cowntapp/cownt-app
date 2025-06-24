import { LoginForm } from '@/features/auth/login/LoginForm';
import type { LoginUserRequest } from '@/features/auth/interfaces/Auth';
import { useLogin } from '@/features/auth/login/hooks/useLogin';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const Login = () => {
  const navigate = useNavigate();
  const { userAuthQuery } = useAuth();

  useEffect(() => {
    if (userAuthQuery.data && userAuthQuery.isSuccess) {
      // If already authenticated, always redirect to dashboard
      navigate('/dashboard', { replace: true });
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
