import API from '@/api/apiClient';
import type { MessageResponse, Session } from '../../interfaces/Auth';

export const deleteSession = async (sessionId: string) =>
  API.delete<never, MessageResponse, Session>(`/sessions/${sessionId}`);
