import API from '@/api/apiClient';
import type { Session } from '../../interfaces/Auth';

export const getSessions = async () => {
  const response = await API.get<Session[]>('/sessions');
  return response.data;
};
