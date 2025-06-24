import type { ReactNode } from 'react';

interface TypoLeadProps {
  className?: string;
  children: ReactNode;
  variant?: 'destructive' | 'accent';
}

export function TypoLead({ className, children, variant }: TypoLeadProps) {
  const variantStyle =
    variant === 'accent' ? 'text-accent-foreground' : 'text-destructive';
  return (
    <p
      className={`${
        variant ? variantStyle : 'text-muted-foreground'
      } text-xl ${className}`}
    >
      {children}
    </p>
  );
}
