import { useAnimalWorkspace } from '@/features/animals/hooks/useAnimalWorkspace';
import { useStatistics } from '@/features/animals/hooks/useStatistics';
import { StatisticsHeader } from '@/features/animals/components/Statistics/components/StatisticsHeader/StatisticsHeader';
import { StatisticsList } from '@/features/animals/components/Statistics/components/StatisticsList/StatisticsList';
import { QueryBoundary } from '@/shared/components/QueryBoundary';

export const WorkspaceDashboard = () => {
  const { workspace, isValidWorkspace } = useAnimalWorkspace();

  // Siempre llamamos los hooks, pero solo usaremos los datos si el workspace es válido
  // Usamos un valor por defecto para evitar el error de hooks condicionales
  const validWorkspace = isValidWorkspace && workspace ? workspace : 'cows';

  const statisticsQuery = useStatistics(validWorkspace);

  return (
    <div className="w-full">
      <QueryBoundary query={statisticsQuery}>
        {(data) => (
          <>
            <StatisticsHeader statistics={data} />
            <StatisticsList
              animals={data.animals}
              workspace={validWorkspace}
            />
          </>
        )}
      </QueryBoundary>
    </div>
  );
};
