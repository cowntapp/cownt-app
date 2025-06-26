import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { buttonVariants } from '@/shadcn/components/ui/button';
import { GalleryVerticalEnd } from 'lucide-react';
import { Link } from 'react-router';

export const RegisterHeader = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Link
        to="/"
        className="flex items-center gap-2 font-medium"
      >
        <div className="flex size-8 items-center justify-center rounded-md">
          <GalleryVerticalEnd className="size-6" />
        </div>
        <span>Acme Inc.</span>
      </Link>
      <TypoH1 className="py-4">Register</TypoH1>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link
          to="/login"
          className={buttonVariants({ variant: 'link' })}
        >
          Login
        </Link>
      </div>
    </div>
  );
};
