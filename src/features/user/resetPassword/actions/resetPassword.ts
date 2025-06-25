import API from '@/api/apiClient';
import type {
  MessageResponse,
  ResetPasswordRequest,
} from '../../interfaces/Auth';

export const resetPassword = async (data: ResetPasswordRequest) =>
  API.post<never, MessageResponse>('/auth/password/reset', data);
