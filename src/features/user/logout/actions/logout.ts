import API from '@/api/apiClient';
import type { MessageResponse } from '../../interfaces/Auth';

export const logout = async () => {
  const response = await API.post<MessageResponse>('/auth/logout');
  return response.data;
};
