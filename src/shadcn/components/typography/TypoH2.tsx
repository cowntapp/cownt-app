import type { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

interface TypographyH2Props {
  className?: string;
  children: ReactNode;
  asChild?: boolean;
}

export function TypoH2({
  className,
  children,
  asChild = false,
  ...props
}: TypographyH2Props & React.ComponentProps<'h2'>) {
  const Comp = asChild ? Slot : 'h2';

  return (
    <Comp
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${
        className || ''
      }`}
      {...props}
    >
      {children}
    </Comp>
  );
}
