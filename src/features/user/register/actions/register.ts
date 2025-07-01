import API from '@/api/apiClient';
import type { EmailResponse, RegisterUserRequest } from '../../interfaces/Auth';

export const register = async (data: RegisterUserRequest) => {
  const response = await API.post<EmailResponse>('/auth/register', data);
  return response.data;
};
