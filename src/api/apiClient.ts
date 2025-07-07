import axios, { type CreateAxiosDefaults } from 'axios';
import { queryClient } from '@/providers/query/config/queryClient';
import { navigate } from '@/shared/utils/navigation';
import { ALLOW_REGISTER } from '@/config/consts/configConsts';
import { AUTH } from '@/features/user/auth/hooks/useAuth';

// --- Axios Configuration ---
const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

// --- API Clients ---
const API = axios.create(options);
const REFRESH_API_CLIENT = axios.create(options);
const ANIMAL_API = axios.create(options);

// ✅ Control de refresh - UNA SOLA PETICIÓN A LA VEZ
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let refreshPromise: Promise<any> | null = null;
let isRefreshing = false;

// ✅ Función para hacer refresh de forma serializada
const performRefresh = async () => {
  if (isRefreshing && refreshPromise) {
    console.log('🔄 Refresh already in progress, waiting...');
    return refreshPromise;
  }

  console.log('🔄 Starting new refresh...');
  isRefreshing = true;

  try {
    refreshPromise = REFRESH_API_CLIENT.get('/auth/refresh');
    const result = await refreshPromise;
    console.log('✅ Refresh successful:', result);
    return result;
  } catch (error) {
    console.error('❌ Refresh failed:', error);
    throw error;
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
};

// --- Error Handling ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandling = async (error: any) => {
  if (!error) {
    return Promise.reject({ status: 500 });
  }

  const status: number = (error.response && error.response.status) ?? 500;
  const data: Record<string, string> = error.response?.data ?? {};

  // If access token is invalid, try to refresh it
  if (status === 401 && data?.errorCode === 'InvalidAccessToken') {
    try {
      // ✅ Usar refresh serializado
      await performRefresh();

      // ✅ Esperar un momento para que las cookies se establezcan
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log('🔁 Retrying original request...');
      return API(error.config);
    } catch (refreshError) {
      console.log('❌ Refresh failed, redirecting to login...', refreshError);

      queryClient.setQueriesData({ queryKey: [AUTH] }, null);
      queryClient.removeQueries({ queryKey: [AUTH] });
      queryClient.clear();

      if (
        window.location.pathname !== '/login' &&
        (ALLOW_REGISTER ? window.location.pathname !== '/register' : true)
      ) {
        navigate('/login', {
          state: { from: window.location.pathname },
        });
      }

      return Promise.reject({
        status: 401,
        message: 'Authentication failed',
        isAuthError: true,
      });
    }
  }

  return Promise.reject({ status, ...data });
};

// --- Interceptors ---
REFRESH_API_CLIENT.interceptors.response.use((response) => response);

API.interceptors.response.use((response) => response, errorHandling);

ANIMAL_API.interceptors.response.use((response) => response, errorHandling);

export { ANIMAL_API };
export default API;
