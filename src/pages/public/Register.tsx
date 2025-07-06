import { RegisterForm } from '@/features/user/register/RegisterForm';
import type { RegisterUserRequest } from '@/features/user/interfaces/Auth';
import { useRegister } from '@/features/user/register/hooks/useRegister';
import { useNavigate } from 'react-router';
import { useAuth } from '@/features/user/auth/hooks/useAuth';
import { useEffect } from 'react';

export const Register = () => {
  const navigate = useNavigate();
  const { registerMutation } = useRegister();

  // Use defensive useAuth configuration to avoid API calls and infinite loops
  const { userAuthQuery } = useAuth({
    enabled: false, // Never make API calls
    staleTime: Infinity, // Never consider cache stale
    retry: false, // Don't retry on errors
  });

  useEffect(() => {
    // Only redirect if we have cached user data, never trigger new API calls
    if (userAuthQuery.data && !userAuthQuery.isLoading) {
      console.log(
        '🔄 [Register] User already authenticated, redirecting to dashboard...'
      );
      navigate('/cows', { replace: true });
    }
  }, [userAuthQuery.data, userAuthQuery.isLoading, navigate]);

  const handleSubmit = (user: RegisterUserRequest) => {
    registerMutation.mutate(user);
  };

  return (
    <div className="w-full h-full max-w-sm m-auto">
      <RegisterForm
        isPending={registerMutation.isPending}
        onUserSubmit={handleSubmit}
      />
    </div>
  );
};
