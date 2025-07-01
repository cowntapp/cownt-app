import API from '@/api/apiClient';
import type { MessageResponse } from '../../interfaces/Auth';

export const verifyEmail = async (verificationCode: string) => {
  const response = await API.get<MessageResponse>(
    `/auth/email/verify/${verificationCode}`
  );
  return response.data;
};
