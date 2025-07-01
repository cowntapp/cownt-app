import API from '@/api/apiClient';
import type {
  MessageResponse,
  ResetPasswordRequest,
} from '../../interfaces/Auth';

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await API.post<MessageResponse>(
    '/auth/password/reset',
    data
  );
  return response.data;
};
