import { HAS_WORKSPACES } from '@/config/consts/configConsts';
import { menuData } from '@/config/data/appConfigData';
import { Button } from '@/shadcn/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router';

export const SettingsLayout = () => {
  const location = useLocation();
  const backPath =
    location.state && typeof location.state === 'object' && location.state.from
      ? location.state.from
      : HAS_WORKSPACES
      ? menuData.workspaces![0].url
      : '/dashboard';

  return (
    <div>
      <header className="flex h-16 px-6 shrink-0 items-center gap-2">
        <Button
          asChild
          variant={'link'}
        >
          <Link to={backPath}>
            <ArrowLeft />
            Torna
          </Link>
        </Button>
      </header>
      <div className="px-6 py-4">
        <Outlet />
      </div>
    </div>
  );
};
