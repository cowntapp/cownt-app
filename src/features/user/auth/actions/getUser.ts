import API from '@/api/apiClient';
import type { User } from '../../interfaces/Auth';

export const getUser = async () => API.get<never, User>('/user');
