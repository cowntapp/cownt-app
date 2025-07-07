import { Loader } from '@/shadcn/components/Loader/Loader';
import { useAuth } from '@/features/user/auth/hooks/useAuth';
import { Outlet } from 'react-router';

export const AuthGuard = () => {
  const { userAuthQuery } = useAuth();

  // ✅ Solo manejar loading y success
  // Dejar que el interceptor maneje TODOS los errores de auth
  if (userAuthQuery.isPending) {
    return (
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <Loader />
      </div>
    );
  }

  if (userAuthQuery.isSuccess && userAuthQuery.data) {
    return <Outlet />;
  }

  // ✅ En cualquier error, mostrar loading
  // El interceptor se encargará de la navegación
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Loader />
    </div>
  );
};
