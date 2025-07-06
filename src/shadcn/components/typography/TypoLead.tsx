import type { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { cn } from '@/shadcn/lib/utils';

interface TypoLeadProps {
  className?: string;
  children: ReactNode;
  variant?: 'destructive' | 'accent';
  asChild?: boolean;
}

export function TypoLead({
  className = '',
  children,
  variant,
  asChild = false,
  ...props
}: TypoLeadProps & React.ComponentProps<'p'>) {
  const Comp = asChild ? Slot : 'p';

  const variantStyle =
    variant === 'accent' ? 'text-accent-foreground' : 'text-destructive';
  return (
    <Comp
      className={cn(
        variant ? variantStyle : 'text-muted-foreground',
        `text-xl`,
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
