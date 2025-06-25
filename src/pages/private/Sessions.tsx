import { Loader } from '@/shadcn/components/Loader/Loader';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { SessionCard } from '@/features/user/sessions/components/SessionCard';
import { useSessions } from '@/features/user/sessions/hooks/useSessions';
import { ErrorMessage } from '@/shared/components/ErrorMessage';

export const Sessions = () => {
  const { sessionQuery } = useSessions();

  return (
    <>
      <TypoH1 className="mb-4">My Sessions</TypoH1>
      <div className="h-full flex flex-col gap-y-2">
        {sessionQuery.isLoading && <Loader />}
        {sessionQuery.isError && (
          <ErrorMessage title="Failed to get sessions." />
        )}

        {sessionQuery.isSuccess &&
          sessionQuery.sessions?.map((session) => (
            <SessionCard
              key={session._id}
              session={session}
            />
          ))}
      </div>
    </>
  );
};
