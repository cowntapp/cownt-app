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
        Has oblidat la contrasenya?
      </Link>
      {ALLOW_REGISTER && (
        <div className="text-center text-sm">
          No tens un compte?{' '}
          <Link
            to="/register"
            className={buttonVariants({ variant: 'link' })}
          >
            Registra&apos;t
          </Link>
        </div>
      )}
    </div>
  );
};
