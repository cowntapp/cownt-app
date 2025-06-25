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
    </TypoMuted>
  );
};
