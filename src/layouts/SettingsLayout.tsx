import { HAS_WORKSPACES } from '@/config/consts/configConsts';
import { menuData } from '@/config/data/appConfigData';
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
        <Link to={backPath}>&larr; Torna</Link>
      </header>
      <div className="px-6 py-4">
        <Outlet />
      </div>
    </div>
  );
};
