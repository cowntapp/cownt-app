import { AverageStats } from './components/AverageStats';
import { BirthExtremesStats } from './components/BirthExtremesStats';
import { PopulationStats } from './components/PopulationStats';

export interface StatisticsHeaderProps {
  statistics: {
    averageOfAverages: number;
    olderZeroBirthAnimal: {
      birthDate: string | null;
    } | null;
    higherAvgAnimal: {
      birthAverageDays: number | null;
    } | null;
    maxLastBirthAnimal: {
      lastIntervalDays: number | null;
    } | null;
    totalReproductiveAnimals: number;
    totalOnePlusBirthAnimals: number;
    totalZeroBirthAnimals: number;
  };
}

export const StatisticsHeader = ({ statistics }: StatisticsHeaderProps) => {
  return (
    <div className="flex flex-col space-y-4 text-left sm:text-center">
      <AverageStats averageOfAverages={statistics.averageOfAverages} />
      <BirthExtremesStats
        olderZeroBirthAnimal={statistics.olderZeroBirthAnimal}
        higherAvgAnimal={statistics.higherAvgAnimal}
        maxLastBirthAnimal={statistics.maxLastBirthAnimal}
      />
      <PopulationStats
        totalReproductiveAnimals={statistics.totalReproductiveAnimals}
        totalOnePlusBirthAnimals={statistics.totalOnePlusBirthAnimals}
        totalZeroBirthAnimals={statistics.totalZeroBirthAnimals}
      />
    </div>
  );
};
