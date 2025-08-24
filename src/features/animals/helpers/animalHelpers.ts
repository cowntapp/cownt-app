import type { AnimalRaw } from '../interfaces/animal';

export const filterPresentAnimals = (animals: AnimalRaw[]) => {
  return animals.filter((animal) => !animal.absence);
};
