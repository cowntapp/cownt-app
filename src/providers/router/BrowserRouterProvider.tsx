import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router';

export const BrowserRouterProvider = ({ children }: PropsWithChildren) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
