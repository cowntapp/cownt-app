import API from '@/api/apiClient';
import type { User } from '../../interfaces/Auth';

export const getUser = async () => {
  const response = await API.get<User>('/user');
  return response.data;
};
