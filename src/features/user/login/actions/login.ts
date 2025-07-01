import API from '@/api/apiClient';
import type { LoginUserRequest, MessageResponse } from '../../interfaces/Auth';

export const login = async (data: LoginUserRequest) => {
  const response = await API.post<MessageResponse>('/auth/login', data);
  return response.data;
};
