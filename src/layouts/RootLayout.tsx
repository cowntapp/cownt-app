import { Toaster } from '@/shadcn/components/ui/sonner';
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
