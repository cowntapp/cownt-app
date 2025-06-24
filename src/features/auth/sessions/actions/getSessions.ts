import API from '@/api/apiClient';
import type { Session } from '../../interfaces/Auth';

export const getSessions = async () => API.get<never, Session[]>('/sessions');
