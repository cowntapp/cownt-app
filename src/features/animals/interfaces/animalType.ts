import { ANIMALS_ROUTE } from '../consts/animal.consts';

export type AnimalPath = `${ANIMALS_ROUTE}`;

// Helper para verificar si un string es un AnimalPath válido
export const isAnimalPath = (path: string): path is AnimalPath => {
  return Object.values(ANIMALS_ROUTE).includes(path as ANIMALS_ROUTE);
};
