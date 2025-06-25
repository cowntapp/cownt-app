import { GalleryVerticalEnd } from 'lucide-react';
import { Link } from 'react-router';

export const RegisterHeader = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <a
        href="#"
        className="flex flex-col items-center gap-2 font-medium"
      >
        <div className="flex size-8 items-center justify-center rounded-md">
          <GalleryVerticalEnd className="size-6" />
        </div>
        <span className="sr-only">Acme Inc.</span>
      </a>
      <h1 className="text-xl font-bold">Sign up for Acme Inc.</h1>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link
          to="/login"
          className="underline underline-offset-4"
        >
          Login
        </Link>
      </div>
    </div>
  );
};
