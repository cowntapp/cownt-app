import type { ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

interface TypoH1Props {
  className?: string;
  children: ReactNode;
  asChild?: boolean;
}

export const TypoH1 = ({
  children,
  className,
  asChild = false,
  ...props
}: TypoH1Props & React.ComponentProps<'h1'>) => {
  const Comp = asChild ? Slot : 'h1';

  return (
    <Comp
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ${
        className || ''
      }`}
      {...props}
    >
      {children}
    </Comp>
  );
};
