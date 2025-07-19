import { ANIMAL_API } from '@/api/apiClient';
import type { Owner } from '../interface/owner';

export const getOwners = async () => {
  const { data } = await ANIMAL_API.get<Owner[]>(`/owners`);

  const sortedOwners = data.sort((a, b) =>
    a.value.localeCompare(b.value, 'ca', { sensitivity: 'base' })
  );

  return { owners: sortedOwners };
};
