import { ALLOW_REGISTER } from '@/config/consts/configConsts';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { buttonVariants } from '@/shadcn/components/ui/button';
import { GalleryVerticalEnd } from 'lucide-react';
import { Link } from 'react-router';

export const LoginHeader = () => {
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
      <TypoH1 className="py-4">
        {/* TODO: delete or abstract */}
        {/* Inicia sessió / Accedeix */}
        Log in
      </TypoH1>
      {ALLOW_REGISTER && (
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className={buttonVariants({ variant: 'link' })}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};
