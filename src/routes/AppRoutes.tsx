import { ALLOW_REGISTER } from '@/config/consts/configConsts';
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
import { Animal } from '@/pages/private/Animal';
import { Animals } from '@/pages/private/Animals';
import { NotFound } from '@/pages/public/NotFound';
import { NewBreed } from '@/pages/private/NewBreed';
import { EditBreed } from '@/pages/private/EditBreed';
import { NewCharacteristic } from '@/pages/private/NewCharacteristic';
import { EditCharacteristic } from '@/pages/private/EditCharacteristic';

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
            element={<Home />}
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
              {/* STATISTICS */}
              <Route
                path="statistics"
                element={<WorkspaceDashboard />}
              />

              {/* ANIMALS */}
              <Route
                index
                element={<Animals />}
              />
              <Route
                path=":id"
                element={<Animal />}
              />

              {/* BREEDS */}
              <Route path="breeds">
                <Route
                  index
                  element={<Breeds />}
                />
                <Route
                  path="new"
                  element={<NewBreed />}
                />
                <Route
                  path=":id/edit"
                  element={<EditBreed />}
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

              {/* CHARACTERISTICS */}
              <Route path="characteristics">
                <Route
                  index
                  element={<Characteristics />}
                />
                <Route
                  path="new"
                  element={<NewCharacteristic />}
                />
                <Route
                  path=":id/edit"
                  element={<EditCharacteristic />}
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

          {/* SETTINGS */}
          <Route element={<SettingsLayout />}>
            <Route
              path="sessions"
              element={<Sessions />}
            />
            {/* <Route
              path="settings"
              element={<div>Here you find some settings</div>}
            /> */}
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
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
