import { ANIMAL_API } from '@/api/apiClient';
import type { AnimalPath } from '../interfaces/animalType';
import type { AnimalRaw } from '../interfaces/animal';

export interface EditAnimalPayload {
  weight?: string | null;
  buyPrice?: number | null;
  salePrice?: number | null;
  absence?: string | null;
  characteristics?: string[];
}

export const editAnimal = async (
  animalType: AnimalPath,
  animalId: string,
  payload: EditAnimalPayload
) => {
  const response = await ANIMAL_API.patch<AnimalRaw>(
    `/${animalType}/${animalId}`,
    payload
  );

  return response.data;
};
