import { ErrorMessage } from '@/shared/components/ErrorMessage';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <ErrorMessage
        title="La página que busques no existeix."
        linkLabel="Inici"
        linkPath="/"
        linkReplace
      />
    </div>
  );
};
