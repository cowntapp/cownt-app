import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { Button } from '@/shadcn/components/ui/button';
import { Link } from 'react-router';

interface AppMessageProps {
  title: string;
  description?: string;
  linkLabel?: string;
  linkPath?: string;
  linkReplace?: boolean;
}

export const AppMessage = ({
  title,
  description,
  linkLabel,
  linkPath,
  linkReplace = true,
}: AppMessageProps) => {
  return (
    <div className="w-full max-w-sm mx-auto my-16 flex flex-col gap-y-8 text-center">
      <TypoLead variant="accent">{title}</TypoLead>
      {description && <TypoMuted>{description}</TypoMuted>}

      {linkPath && (
        <TypoMuted>
          Ves a{' '}
          <Button
            asChild
            variant={'link'}
          >
            <Link
              to={linkPath}
              replace={linkReplace}
            >
              {linkLabel}
            </Link>
          </Button>
        </TypoMuted>
      )}
    </div>
  );
};
