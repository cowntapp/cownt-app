import { RegisterForm } from '@/features/auth/register/RegisterForm';
import type { RegisterUserRequest } from '@/features/auth/interfaces/Auth';
import { useRegister } from '@/features/auth/register/hooks/useRegister';
import { useNavigate } from 'react-router';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useEffect } from 'react';

export const Register = () => {
  const navigate = useNavigate();
  const { registerMutation } = useRegister();
  const { userAuthQuery } = useAuth();

  useEffect(() => {
    if (userAuthQuery.data) {
      navigate('/dashboard', { replace: true });
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
