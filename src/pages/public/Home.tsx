import { ALLOW_REGISTER } from '@/config/consts/configConsts';
import { Button } from '@/shadcn/components/ui/button';
import { Link } from 'react-router';

export const Home = () => {
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
