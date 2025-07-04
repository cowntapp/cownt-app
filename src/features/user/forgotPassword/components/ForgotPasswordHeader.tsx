import { APP_NAME } from '@/config/consts/configConsts';
import { AppLogo } from '@/config/data/appConfigData';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { Link } from 'react-router';

export const ForgotPasswordHeader = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Link
        to="/"
        className="flex items-center gap-2 font-medium"
      >
        <div className="flex size-8 items-center justify-center rounded-md">
          <AppLogo className="size-6" />
        </div>
        <span>{APP_NAME}</span>
      </Link>
      <div className="py-4 flex flex-col gap-y-4 text-center">
        <TypoH1>Has oblidat la contrasenya?</TypoH1>
        <TypoMuted>Envia un Enllaç de recuperació al teu email.</TypoMuted>
      </div>
    </div>
  );
};
