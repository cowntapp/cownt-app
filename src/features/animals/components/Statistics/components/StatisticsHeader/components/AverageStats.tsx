import { daysToMonths } from '@/features/animals/utils/daysToMonths';

interface AverageStatsProps {
  averageOfAverages: number | null;
}

export const AverageStats = ({ averageOfAverages }: AverageStatsProps) => {
  return (
    <div className="text-3xl py-8">
      <h1 className="font-bold">Mitjana Parts Ramat</h1>
      <p className="text-primary">
        {averageOfAverages} d{' '}
        <span className="text-xl text-gray-500">
          {daysToMonths(averageOfAverages)}
        </span>
      </p>
    </div>
  );
};
