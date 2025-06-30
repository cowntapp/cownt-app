import { RegisterForm } from '@/features/user/register/RegisterForm';
import type { RegisterUserRequest } from '@/features/user/interfaces/Auth';
import { useRegister } from '@/features/user/register/hooks/useRegister';
import { useNavigate } from 'react-router';
import { useAuth } from '@/features/user/auth/hooks/useAuth';
import { useEffect } from 'react';

export const Register = () => {
  const navigate = useNavigate();
  const { registerMutation } = useRegister();
  const { userAuthQuery } = useAuth();

  useEffect(() => {
    if (userAuthQuery.data) {
      // TODO: make it to redirect to landing (/) (when implemented)
      navigate('/cows', { replace: true });
    }
  }, [userAuthQuery, navigate]);

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
