import { ANIMAL_API } from '@/api/apiClient';
import type { OwnerFormData } from '../schemas/ownerSchema';
import type { Owner } from '../interface/owner';

export const editOwner = async (ownerId: string, data: OwnerFormData) => {
  const response = await ANIMAL_API.patch<Owner>(`/owners/${ownerId}`, data);

  return response.data;
};
