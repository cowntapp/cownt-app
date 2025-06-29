import { ANIMAL_API } from '@/api/apiClient';
import type { CowRaw } from '../interfaces/cow';

export const getCows = async () => {
  const { data } = await ANIMAL_API.get<CowRaw[]>('/cows');

  return { cows: data };
};
