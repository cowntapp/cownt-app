import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalPath } from '../interfaces/animalType';
import type { AnimalRaw } from '../interfaces/animal';
import type { ABSENCE, ORIGIN, SEX } from '../consts/animal.consts';

export type CreateAnimalPayload = {
  longCode: string;
  breed: string;
  sex: SEX;
  birthDate?: string | undefined;
  weight?: string | undefined;
  origin: ORIGIN;
  buyPrice?: number | undefined;
  salePrice?: number | undefined;
  absence: ABSENCE | null;
  characteristics?: string[] | undefined;
  mother?: string | undefined;
  children?: string[] | undefined;
};

export const createAnimal = async (
  animalType: AnimalPath,
  payload: CreateAnimalPayload
) => {
  const response = await ANIMAL_API.post<AnimalRaw>(`/${animalType}/`, payload);

  return response.data;
};
