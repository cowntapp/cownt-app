import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouterProvider } from './router/BrowserRouterProvider';
import { ThemeProvider } from './theme/ThemeProvider';
import { TastackQueryProvider } from './query/TastackQueryProvider';
import type { PropsWithChildren } from 'react';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <TastackQueryProvider>
        <BrowserRouterProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouterProvider>
      </TastackQueryProvider>
    </ThemeProvider>
  );
};
