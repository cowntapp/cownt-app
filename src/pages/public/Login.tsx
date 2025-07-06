import { LoginForm } from '@/features/user/login/LoginForm';
import type { LoginUserRequest } from '@/features/user/interfaces/Auth';
import { useLogin } from '@/features/user/login/hooks/useLogin';
import { useAuth } from '@/features/user/auth/hooks/useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const Login = () => {
  const navigate = useNavigate();

  // Use defensive useAuth configuration to avoid API calls and infinite loops
  const { userAuthQuery } = useAuth({
    enabled: false, // Never make API calls
    staleTime: Infinity, // Never consider cache stale
    retry: false, // Don't retry on errors
  });

  useEffect(() => {
    // Only redirect if we have cached user data, never trigger new API calls
    if (
      userAuthQuery.data &&
      userAuthQuery.isSuccess &&
      !userAuthQuery.isLoading
    ) {
      console.log(
        '🔄 [Login] User already authenticated, redirecting to dashboard...'
      );
      navigate('/cows', { replace: true });
    }
  }, [
    userAuthQuery.data,
    userAuthQuery.isSuccess,
    userAuthQuery.isLoading,
    navigate,
  ]);

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
