import { buttonVariants } from '@/shadcn/components/ui/button';
import { Link } from 'react-router';

export const RegisterFooter = () => {
  return (
    <div className="text-center text-sm">
      Already have an account?{' '}
      <Link
        to="/login"
        className={buttonVariants({ variant: 'link' })}
      >
        Login
      </Link>
    </div>
  );
};
