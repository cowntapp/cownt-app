import { ALLOW_REGISTER } from '@/config/consts/configConsts';
import { buttonVariants } from '@/shadcn/components/ui/button';
import { Link } from 'react-router';

export const LoginFooter = () => {
  return (
    <div className="flex flex-col">
      <Link
        to={'/password/forgot'}
        className={buttonVariants({ variant: 'link', size: 'default' })}
      >
        Forgot password?
      </Link>
      {ALLOW_REGISTER && (
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className={buttonVariants({ variant: 'link' })}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};
