import API from '@/api/apiClient';
import type { MessageResponse } from '../interfaces/Auth';

export const logout = async () =>
  API.get<never, MessageResponse>('/auth/logout');
