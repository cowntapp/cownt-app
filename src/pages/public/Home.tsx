import { ALLOW_REGISTER, HAS_LANDING } from '@/config/consts/configConsts';
import { Button } from '@/shadcn/components/ui/button';
import { Link, Navigate } from 'react-router';

export const Home = () => {
  if (!HAS_LANDING)
    return (
      <Navigate
        to={'/login'}
        replace
      />
    );

  return (
    <>
      Optional Landing Page
      <div className="flex gap-2">
        <Button asChild>
          <Link to={'/login'}>Login</Link>
        </Button>
        {ALLOW_REGISTER && (
          <Button
            asChild
            variant={'outline'}
          >
            <Link to={'register'}>Register</Link>
          </Button>
        )}
      </div>
    </>
  );
};
