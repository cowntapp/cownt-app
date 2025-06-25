import type { ReactNode } from 'react';

interface TypoH1Props {
  className?: string;
  children: ReactNode;
}

export const TypoH1 = ({ children, className }: TypoH1Props) => {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ${className}`}
    >
      {children}
    </h1>
  );
};
