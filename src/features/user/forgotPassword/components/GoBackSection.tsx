import { ALLOW_REGISTER } from '@/config/consts/configConsts';
import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { Button } from '@/shadcn/components/ui/button';
import { Link } from 'react-router';

export const GoBackSection = () => {
  return (
    <TypoMuted className="text-center">
      Go back to
      <Button
        asChild
        variant={'link'}
      >
        <Link
          to={'/login'}
          replace
        >
          Login
        </Link>
      </Button>
      {ALLOW_REGISTER && (
        <>
          or
          <Button
            asChild
            variant={'link'}
          >
            <Link
              to={'/register'}
              replace
            >
              Register
            </Link>
          </Button>
        </>
      )}
    </TypoMuted>
  );
};
