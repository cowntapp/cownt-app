import type { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

interface TypoMutedProps {
  className?: string;
  children: ReactNode;
  asChild?: boolean;
}

export const TypoMuted = ({
  children,
  className,
  asChild = false,
  ...props
}: TypoMutedProps & React.ComponentProps<'p'>) => {
  const Comp = asChild ? Slot : 'p';

  return (
    <Comp
      className={`text-muted-foreground text-sm ${className || ''}`}
      {...props}
    >
      {children}
    </Comp>
  );
};
