import { ALLOW_REGISTER } from '@/config/consts/configConsts';
import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { Button } from '@/shadcn/components/ui/button';
import { Link } from 'react-router';

export const ForgotPasswordFooter = () => {
  return (
    <TypoMuted className="text-center">
      Ves a
      <Button
        asChild
        variant={'link'}
      >
        <Link
          to={'/login'}
          replace
        >
          Inicia sessió
        </Link>
      </Button>
      {ALLOW_REGISTER && (
        <>
          o
          <Button
            asChild
            variant={'link'}
          >
            <Link
              to={'/register'}
              replace
            >
              Registra&apos;t
            </Link>
          </Button>
        </>
      )}
    </TypoMuted>
  );
};
