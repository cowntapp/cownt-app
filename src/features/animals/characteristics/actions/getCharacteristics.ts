import API from '@/api/apiClient';
import type { Characteristic } from '../interface/characteristic';
import type { AnimalPath } from '../../interfaces/animalType';

export const getCharacteristics = async (animalPath: AnimalPath) => {
  const { data } = await API.get<Characteristic[]>(
    `/${animalPath}/characteristics`
  );

  const sortedCharacteristics = data.sort((a, b) =>
    a.value.localeCompare(b.value, 'ca', { sensitivity: 'base' })
  );

  return { characteristics: sortedCharacteristics };
};
