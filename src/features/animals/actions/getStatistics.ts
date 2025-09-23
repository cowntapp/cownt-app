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
  // const animalsWithReproductiveAge = data.animals.filter(
  //   (animal) => animal.reproductiveIntervalDays !== null
  // );
  const animalsWithoutBirth = data.animals.filter(
    (animal) => !animal.lastIntervalDays
  );

  let lowerAvgAnimal;
  let higherAvgAnimal;
  let olderZeroBirthAnimal;
  let maxLastBirthAnimal;

  if (animalsWithAvg.length > 0) {
    lowerAvgAnimal = animalsWithAvg.reduce(
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
  } else {
    lowerAvgAnimal = null;
  }

  if (animalsWithAvg.length > 0) {
    higherAvgAnimal = animalsWithAvg.reduce(
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
  } else {
    higherAvgAnimal = null;
  }

  if (animalsWithoutBirth.length > 0) {
    olderZeroBirthAnimal = animalsWithoutBirth.reduce(
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
  } else {
    olderZeroBirthAnimal = null;
  }

  if (animalsWithLastIntervalDays.length > 0) {
    maxLastBirthAnimal = animalsWithLastIntervalDays.reduce(
      (tempMaxLastBirthAnimal, currAnimal) => {
        if (
          currAnimal.lastIntervalDays! >
          tempMaxLastBirthAnimal.lastIntervalDays!
        ) {
          return currAnimal;
        } else {
          return tempMaxLastBirthAnimal;
        }
      },
      animalsWithLastIntervalDays[0]
    );
  } else {
    maxLastBirthAnimal = null;
  }

  const totalReproductiveAnimals = data.animals.length;
  const totalOnePlusBirthAnimals = animalsWithLastIntervalDays.length;
  const totalZeroBirthAnimals = animalsWithoutBirth.length;

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
