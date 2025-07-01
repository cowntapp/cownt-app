import API from '@/api/apiClient';
import type { MessageResponse } from '../../interfaces/Auth';

export const deleteSession = async (sessionId: string) => {
  const response = await API.delete<MessageResponse>(`/sessions/${sessionId}`);
  return response.data;
};
