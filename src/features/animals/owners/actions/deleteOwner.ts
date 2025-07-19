import { ANIMAL_API } from '@/api/apiClient';
import type { Owner } from '../interface/owner';

export const deleteOwner = async (ownerId: string) => {
  const response = await ANIMAL_API.delete<Owner>(`/owners/${ownerId}`);

  return response.data;
};
