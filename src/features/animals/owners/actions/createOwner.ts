import { ANIMAL_API } from '@/api/apiClient';
import type { Owner } from '../interface/owner';
import type { OwnerFormData } from '../schemas/ownerSchema';

export const createOwner = async (data: OwnerFormData) => {
  const response = await ANIMAL_API.post<Owner>(`/owners`, data);

  return response.data;
};
