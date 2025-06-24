import { Loader } from '@/components/Loader/Loader';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Navigate, Outlet } from 'react-router';

export const AuthGuard = () => {
  const { userAuthQuery } = useAuth();

  const user = userAuthQuery.data;

  return (
    <>
      {userAuthQuery.isLoading && (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
          <Loader />
        </div>
      )}

      {userAuthQuery.isSuccess && user && <Outlet />}

      {userAuthQuery.isError && (
        <Navigate
          to={'/login'}
          replace
        />
      )}
    </>
  );
};
