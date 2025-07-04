import { Loader } from '@/shadcn/components/Loader/Loader';
import { Button } from '@/shadcn/components/ui/button';
import { verifyEmail } from '@/features/user/verifyEmail/actions/verifyEmail';
import { AppMessage } from '@/shared/components/AppMessage';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { ALLOW_REGISTER } from '@/config/consts/configConsts';

export const VerifyEmail = () => {
  const { code } = useRouterParams('code');

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ['emailVerification', code],
    queryFn: () => verifyEmail(code),
  });

  return (
    <div className="w-full max-w-md mx-auto my-auto flex flex-col gap-y-8">
      {isPending && <Loader />}
      {isSuccess && <AppMessage title="Email verificat!" />}
      {isError && (
        <ErrorMessage
          title="Enllaç no vàlid"
          description="L'Enllaç és incorrecte o ha expirat."
          linkLabel={ALLOW_REGISTER ? `Registra't de nou` : undefined}
          linkPath={ALLOW_REGISTER ? '/register' : undefined}
        />
      )}

      {isError && (
        <Button asChild>
          <Link
            to="/"
            replace
          >
            Torna a l'Inici
          </Link>
        </Button>
      )}

      {isSuccess && (
        <Button asChild>
          <Link
            to="/login"
            replace
          >
            Inicia sessió
          </Link>
        </Button>
      )}
    </div>
  );
};
