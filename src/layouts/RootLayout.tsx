import { Toaster } from '@/shadcn/components/ui/sonner';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { Outlet } from 'react-router';

export const RootLayout = () => {
  return (
    <>
      <ThemeToggle />
      <Outlet />
      <Toaster
        richColors
        position="top-center"
      />
    </>
  );
};
