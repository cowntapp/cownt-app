import API from '@/api/apiClient';
import type { MessageResponse } from '../../interfaces/Auth';

export const verifyEmail = async (verificationCode: string) =>
  API.get<never, MessageResponse>(`/auth/email/verify/${verificationCode}`);
