import API from '@/api/apiClient';
import type { LoginUserRequest, MessageResponse } from '../../interfaces/Auth';

export const login = async (data: LoginUserRequest) =>
  API.post<never, MessageResponse>('/auth/login', data);
