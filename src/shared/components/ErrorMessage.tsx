import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { Button } from '@/shadcn/components/ui/button';
import { Link } from 'react-router';

interface ErrorMessageProps {
  title: string;
  description?: string;
  linkLabel?: string;
  linkPath?: string;
  linkReplace?: boolean;
  className?: string;
  alignText?: 'left' | 'center' | 'right';
}

export const ErrorMessage = ({
  title,
  description,
  linkLabel,
  linkPath,
  linkReplace = true,
  className,
  alignText = 'center',
}: ErrorMessageProps) => {
  const textAlign = {
    left: 'items-start',
    center: 'items-center',
    right: 'items-end',
  };
  return (
    <div className={`flex flex-col ${textAlign[alignText]} gap-4 ${className}`}>
      <TypoLead
        className="text-center"
        variant="destructive"
      >
        {title}
      </TypoLead>

      <div className="flex items-center justify-center">
        {description && <TypoMuted>{description}</TypoMuted>}

        {linkPath && linkLabel && (
          <Button
            variant={'link'}
            asChild
          >
            <Link
              to={linkPath}
              replace={linkReplace}
            >
              {linkLabel}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
