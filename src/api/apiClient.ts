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
const ANIMAL_API = axios.create(options);

// ✅ Cliente especial para refresh (SIN interceptor)
const REFRESH_CLIENT = axios.create(options);

// ✅ Control de refresh - UNA SOLA PETICIÓN A LA VEZ
let isRefreshing = false;

// ✅ Función para limpiar cache y redirigir
const clearAuthAndRedirect = () => {
  console.log('🧹 Clearing auth cache and redirecting...');
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
};

// ✅ Función para verificar si tenemos accessToken (verificación real)
const hasAccessToken = async () => {
  try {
    // Hacer una petición simple que requiera autenticación
    const response = await REFRESH_CLIENT.get('/user');
    console.log('✅ AccessToken verified via API call');
    return response.status === 200;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('❌ AccessToken verification failed:', error?.response?.status);
    return false;
  }
};

// --- Error Handling Simplificado ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandling = async (error: any) => {
  if (!error) {
    return Promise.reject({ status: 500 });
  }

  const status: number = (error.response && error.response.status) ?? 500;
  const data: Record<string, string> = error.response?.data ?? {};

  // ✅ Caso 1: InvalidAccessToken - Intentar refresh
  if (status === 401 && data?.errorCode === 'InvalidAccessToken') {
    // Evitar múltiples refreshes simultáneos
    if (isRefreshing) {
      console.log('🔄 Refresh already in progress, waiting...');
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verificar si ahora tenemos accessToken
      if (await hasAccessToken()) {
        console.log(
          '✅ AccessToken now available, retrying original request...'
        );
        return API(error.config);
      } else {
        console.log('❌ Still no accessToken after waiting');
        clearAuthAndRedirect();
        return Promise.reject({
          status: 401,
          message: 'Authentication failed',
          isAuthError: true,
        });
      }
    }

    console.log('🔄 Attempting refresh...');
    isRefreshing = true;

    try {
      // ✅ Usar cliente especial para refresh
      const refreshResponse = await REFRESH_CLIENT.get('/auth/refresh');
      console.log('✅ Refresh response:', refreshResponse.status);

      // ✅ Caso 2: Refresh exitoso - Verificar accessToken
      if (refreshResponse.status === 200) {
        // Esperar un poco para que las cookies se establezcan
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Verificar si tenemos accessToken mediante API call
        if (await hasAccessToken()) {
          console.log('✅ AccessToken verified, retrying original request...');
          return API(error.config);
        } else {
          console.log('❌ No accessToken after successful refresh');
          clearAuthAndRedirect();
          return Promise.reject({
            status: 401,
            message: 'Authentication failed',
            isAuthError: true,
          });
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (refreshError: any) {
      console.log('❌ Refresh failed:', refreshError?.response?.status);

      // ✅ Caso 3: InvalidRefreshToken - Limpiar y redirigir
      if (
        refreshError?.response?.status === 401 &&
        refreshError?.response?.data?.errorCode === 'InvalidRefreshToken'
      ) {
        console.log('🚨 Invalid refresh token, clearing cache...');
        clearAuthAndRedirect();
        return Promise.reject({
          status: 401,
          message: 'Authentication failed',
          isAuthError: true,
        });
      }

      // Cualquier otro error de refresh
      console.log('🚨 Unexpected refresh error, clearing cache...');
      clearAuthAndRedirect();
      return Promise.reject({
        status: 401,
        message: 'Authentication failed',
        isAuthError: true,
      });
    } finally {
      isRefreshing = false;
    }
  }

  // Para cualquier otro error, rechazar normalmente
  return Promise.reject({ status, ...data });
};

// --- Interceptors ---
API.interceptors.response.use((response) => response, errorHandling);
ANIMAL_API.interceptors.response.use((response) => response, errorHandling);

export { ANIMAL_API };
export default API;
