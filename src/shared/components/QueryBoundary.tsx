import { useEffect, type ReactNode } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import { Loader } from '@/shadcn/components/Loader/Loader';
import { toast } from 'sonner';
import { ErrorMessage } from './ErrorMessage';
import { i18n_errors } from '../translations/translations';

interface QueryBoundaryProps<T> {
  query: UseQueryResult<T, Error>;
  loaderComponent?: ReactNode;
  errorType?: 'component' | 'toast';
  errorComponent?: ReactNode;
  errorText?: string;
  children: (data: T) => ReactNode;
}

export const QueryBoundary = <T,>({
  query,
  loaderComponent,
  errorType = 'component',
  errorComponent,
  errorText = i18n_errors[500],
  children,
}: QueryBoundaryProps<T>) => {
  useEffect(() => {
    if (query.isError && errorType === 'toast') {
      toast.error(errorText);
    }
  }, [query.isError, errorText, errorType]);

  if (query.isLoading) return loaderComponent ?? <Loader className="my-18" />;
  if (query.isError && errorType === 'component')
    return (
      errorComponent ?? (
        <ErrorMessage
          title={errorText}
          className="my-8"
        />
      )
    );

  if (!query.data) return null;

  return children(query.data);
};
