import { calculateAge } from '@/features/animals/utils/calculateAge';
import { daysToMonths } from '@/features/animals/utils/daysToMonths';

interface BirthExtremesStatsProps {
  olderZeroBirthAnimal: {
    birthDate: string | null;
  } | null;
  higherAvgAnimal: {
    birthAverageDays: number | null;
  } | null;
  maxLastBirthAnimal: {
    lastIntervalDays: number | null;
  } | null;
}

export const BirthExtremesStats = ({
  olderZeroBirthAnimal,
  higherAvgAnimal,
  maxLastBirthAnimal,
}: BirthExtremesStatsProps) => {
  return (
    <div className="grid grid-cols-1 justify-between py-4 sm:grid-cols-3 space-y-4 text-xl">
      <div className="">
        <h1 className="font-bold">Novella Més Gran</h1>
        {olderZeroBirthAnimal ? (
          <p className="text-primary">
            {calculateAge(olderZeroBirthAnimal.birthDate)?.month} m{' '}
            <span className="text-sm text-gray-500">
              ({calculateAge(olderZeroBirthAnimal.birthDate)?.years}a)
            </span>
          </p>
        ) : (
          <p className="text-primary">-</p>
        )}
      </div>

      <div className="">
        <h1 className="font-bold">Pitjor Mitjana</h1>
        {higherAvgAnimal ? (
          <p className="text-primary">
            {higherAvgAnimal.birthAverageDays} d{' '}
            <span className="text-sm text-gray-500">
              {daysToMonths(higherAvgAnimal.birthAverageDays)}
            </span>
          </p>
        ) : (
          <p className="text-primary">-</p>
        )}
      </div>

      <div className="">
        <h1 className="font-bold">Max Últim Part</h1>
        {maxLastBirthAnimal ? (
          <p className="text-primary">
            {maxLastBirthAnimal.lastIntervalDays} d{' '}
            <span className="text-sm text-gray-500">
              {daysToMonths(maxLastBirthAnimal.lastIntervalDays)}
            </span>
          </p>
        ) : (
          <p className="text-primary">-</p>
        )}
      </div>
    </div>
  );
};
