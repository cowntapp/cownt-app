import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router';

export const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster
        richColors
        position="top-center"
      />
    </>
  );
};
