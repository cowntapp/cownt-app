import type { ReactNode } from 'react';

interface TypoMutedProps {
  className?: string;
  children: ReactNode;
}

export const TypoMuted = ({ children, className }: TypoMutedProps) => {
  return (
    <p className={`text-muted-foreground text-sm ${className}`}>{children}</p>
  );
};
