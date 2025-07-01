import { ALLOW_REGISTER, HAS_LANDING } from '@/config/consts/configConsts';
import DashboardLayout from '@/layouts/DashboardLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { RootLayout } from '@/layouts/RootLayout';
import { ForgotPassword } from '@/pages/public/ForgotPassword';
import { Home } from '@/pages/public/Home';
import { Login } from '@/pages/public/Login';
import { Register } from '@/pages/public/Register';
import { ResetPassword } from '@/pages/public/ResetPassword';
import { VerifyEmail } from '@/pages/public/VerifyEmail';
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { AuthGuard } from './AuthGuard';
import { VerifyEmailInfo } from '@/pages/public/VerifyEmailInfo';
import { Sessions } from '@/pages/private/Sessions';
import { setNavigate } from '@/shared/utils/navigation';
import { SettingsLayout } from '@/layouts/SettingsLayout';
import { WorkspaceDashboard } from '@/pages/private/WorkspaceDashboard';
import { Breeds } from '@/pages/private/Breeds';
import { Characteristics } from '@/pages/private/Characteristics';
import { Cows } from '@/pages/private/Cows';
import { Sheeps } from '@/pages/private/Sheeps';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { Animal } from '@/pages/private/Animal';

const Landing = () =>
  HAS_LANDING ? (
    <Home />
  ) : (
    <Navigate
      to={'/login'}
      replace
    />
  );

const WorkspaceAnimalsIndex = () => {
  const { workspace } = useRouterParams('workspace');
  if (workspace === 'cows') return <Cows />;
  if (workspace === 'sheeps') return <Sheeps />;
  return (
    <Navigate
      to={'/not-found'}
      replace
    />
  );
};

const AppRoutes = () => {
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route
            index
            element={<Landing />}
          />
          <Route
            path="login"
            element={<Login />}
          />
          {ALLOW_REGISTER && (
            <Route
              path="register"
              element={<Register />}
            />
          )}
          <Route
            path="email/verify"
            element={<VerifyEmailInfo />}
          />
          <Route
            path="email/verify/:code"
            element={<VerifyEmail />}
          />
          <Route
            path="password/forgot"
            element={<ForgotPassword />}
          />
          <Route
            path="password/reset"
            element={<ResetPassword />}
          />
        </Route>

        {/* PRIVATE ROUTES */}
        <Route element={<AuthGuard />}>
          <Route element={<DashboardLayout />}>
            <Route path=":workspace">
              <Route
                path="statistics"
                element={<WorkspaceDashboard />}
              />
              <Route
                index
                element={<WorkspaceAnimalsIndex />}
              />
              <Route
                path=":id"
                element={<Animal />}
              />
              <Route path="breeds">
                <Route
                  index
                  element={<Breeds />}
                />
                <Route
                  path="new"
                  element={<div>Here you can add a new breed</div>}
                />
                <Route
                  path=":id/edit"
                  element={<div>Here you will update the breed</div>}
                />
                <Route
                  path="*"
                  element={
                    <Navigate
                      to={'..'}
                      replace
                    />
                  }
                />
              </Route>
              <Route path="characteristics">
                <Route
                  index
                  element={<Characteristics />}
                />
                <Route
                  path="new"
                  element={<div>Here you can add a new char</div>}
                />
                <Route
                  path=":id/edit"
                  element={<div>Here you will update the char</div>}
                />
                <Route
                  path="*"
                  element={
                    <Navigate
                      to={'..'}
                      replace
                    />
                  }
                />
              </Route>
            </Route>
          </Route>
          <Route element={<SettingsLayout />}>
            <Route
              path="sessions"
              element={<Sessions />}
            />
            <Route
              path="settings"
              element={<div>Here you find some settings</div>}
            />
          </Route>
        </Route>

        {/* NOT_FOUND REDIRECT */}
        <Route
          path="*"
          element={
            <Navigate
              to={'/not-found'}
              replace
            />
          }
        />
        <Route
          path="not-found"
          element={<div>Not found</div>}
        />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
