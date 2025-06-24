import API from '@/api/apiClient';
import type {
  ForgotPasswordRequest,
  MessageResponse,
} from '../../interfaces/Auth';

export const sendPasswordResetEmail = async (data: ForgotPasswordRequest) =>
  API.post<never, MessageResponse>('/auth/password/forgot', data);
