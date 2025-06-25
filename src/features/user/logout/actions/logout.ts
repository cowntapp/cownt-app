import API from '@/api/apiClient';
import type { MessageResponse } from '../../interfaces/Auth';

export const logout = async () =>
  API.post<never, MessageResponse>('/auth/logout');
