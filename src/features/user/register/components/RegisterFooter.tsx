import { buttonVariants } from '@/shadcn/components/ui/button';
import { Link } from 'react-router';

export const RegisterFooter = () => {
  return (
    <div className="text-center text-sm">
      Ja tens un compte?{' '}
      <Link
        to="/login"
        className={buttonVariants({ variant: 'link' })}
      >
        Inicia sessió
      </Link>
    </div>
  );
};
