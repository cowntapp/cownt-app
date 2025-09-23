import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalPath } from '../interfaces/animalType';
import type { AnimalsStatisticsResponse } from '../interfaces/animal';

export const getStatistics = async (animalType: AnimalPath) => {
  const { data } = await ANIMAL_API.get<AnimalsStatisticsResponse>(
    `/${animalType}/${animalType}-with-statistics`
  );

  const animalsWithAvg = data.animals.filter(
    (animal) => animal.birthAverageDays !== null
  );
  const animalsWithLastIntervalDays = data.animals.filter(
    (animal) => animal.lastIntervalDays !== null
  );
  const animalsWithReproductiveAge = data.animals.filter(
    (animal) => animal.reproductiveIntervalDays !== null
  );

  const lowerAvgAnimal = animalsWithAvg.reduce(
    (tempLowestAvgAnimal, currAnimal) => {
      if (
        currAnimal.birthAverageDays! < tempLowestAvgAnimal.birthAverageDays!
      ) {
        return currAnimal;
      } else {
        return tempLowestAvgAnimal;
      }
    },
    animalsWithAvg[0]
  );

  const higherAvgAnimal = animalsWithAvg.reduce(
    (tempHighestAvgAnimal, currAnimal) => {
      if (
        currAnimal.birthAverageDays! > tempHighestAvgAnimal.birthAverageDays!
      ) {
        return currAnimal;
      } else {
        return tempHighestAvgAnimal;
      }
    },
    animalsWithAvg[0]
  );

  const animalsWithoutBirth = data.animals.filter(
    (animal) => !animal.lastIntervalDays && animal.birthDate
  );

  const olderZeroBirthAnimal = animalsWithoutBirth.reduce(
    (tempOldestAnimal, currAnimal) => {
      if (!tempOldestAnimal.birthDate) return currAnimal;
      if (!currAnimal.birthDate) return tempOldestAnimal;

      if (Number(currAnimal.birthDate) < Number(tempOldestAnimal.birthDate)) {
        return currAnimal;
      } else {
        return tempOldestAnimal;
      }
    },
    animalsWithoutBirth[0]
  );

  const maxLastBirthAnimal = animalsWithLastIntervalDays.reduce(
    (tempMaxLastBirthAnimal, currAnimal) => {
      if (
        currAnimal.lastIntervalDays! > tempMaxLastBirthAnimal.lastIntervalDays!
      ) {
        return currAnimal;
      } else {
        return tempMaxLastBirthAnimal;
      }
    },
    data.animals[0]
  );

  const totalReproductiveAnimals = data.animals.length;
  const totalOnePlusBirthAnimals = animalsWithLastIntervalDays.length;
  // Los que no han parido son los que NO tienen lastIntervalDays pero SÍ están en edad reproductiva
  const totalZeroBirthAnimals = animalsWithReproductiveAge.filter(
    (animal) => !animal.lastIntervalDays
  ).length;

  return {
    animals: data.animals,
    averageOfAverages: data.averageOfAverages,
    lowerAvgAnimal,
    higherAvgAnimal,
    olderZeroBirthAnimal,
    maxLastBirthAnimal,
    totalReproductiveAnimals,
    totalZeroBirthAnimals,
    totalOnePlusBirthAnimals,
  };
};
