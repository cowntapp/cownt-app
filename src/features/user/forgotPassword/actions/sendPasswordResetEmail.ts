import API from '@/api/apiClient';
import type {
  ForgotPasswordRequest,
  MessageResponse,
} from '../../interfaces/Auth';

export const sendPasswordResetEmail = async (data: ForgotPasswordRequest) => {
  const response = await API.post<MessageResponse>(
    '/auth/password/forgot',
    data
  );
  return response.data;
};
