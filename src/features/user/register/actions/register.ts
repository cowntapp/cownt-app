import API from '@/api/apiClient';
import type { EmailResponse, RegisterUserRequest } from '../../interfaces/Auth';

export const register = async (data: RegisterUserRequest) =>
  API.post<never, EmailResponse>('/auth/register', data);
