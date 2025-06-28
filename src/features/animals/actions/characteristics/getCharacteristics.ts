import API from '@/api/apiClient';
import type { Characteristic } from '../../interfaces/characteristic';
import type { Animal } from '../../interfaces/animalType';

export const getCharacteristics = async (animalType: Animal) => {
  const animalPath = `${animalType}s`;
  const { data } = await API.get<Characteristic[]>(
    `/${animalPath}/characteristics`
  );

  const sortedCharacteristics = data.sort((a, b) =>
    a.value.localeCompare(b.value, 'ca', { sensitivity: 'base' })
  );

  return { characteristics: sortedCharacteristics };
};
