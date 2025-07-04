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
    <div className="my-auto flex flex-col items-center gap-y-4">
      Optional Landing Page
      <div className="flex gap-2">
        <Button asChild>
          <Link to={'/login'}>Inicia sessió</Link>
        </Button>
        {ALLOW_REGISTER && (
          <Button
            asChild
            variant={'outline'}
          >
            <Link to={'register'}>Registra&apos;t</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
