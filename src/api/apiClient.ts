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

// ✅ Contador de intentos para evitar loops infinitos
const MAX_REFRESH_ATTEMPTS = 3;
let refreshAttempts = 0;

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
    // ✅ Crear nueva instancia para forzar nueva negociación de cookies
    const freshClient = axios.create(options);
    const response = await freshClient.get('/user');
    console.log('✅ AccessToken verified via API call');
    return response.status === 200;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('❌ AccessToken verification failed:', error?.response?.status);
    return false;
  }
};

// --- Error Handling Avanzado ---
// NOTA: Ahora con AuthGuard sin race condition, podemos usar el refresh avanzado
// AuthGuard solo muestra loading en errores, el interceptor maneja toda la lógica de auth
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorHandling = async (error: any) => {
  if (!error) {
    return Promise.reject({ status: 500 });
  }

  const status: number = (error.response && error.response.status) ?? 500;
  const data: Record<string, string> = error.response?.data ?? {};

  // ✅ Caso 1: InvalidAccessToken - Intentar refresh
  if (status === 401 && data?.errorCode === 'InvalidAccessToken') {
    console.log(
      '🔄 [ADVANCED] InvalidAccessToken detected, attempting refresh...'
    );

    // ✅ Verificar si ya hemos excedido los intentos máximos
    if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
      console.log('🚨 Max refresh attempts reached, clearing cache...');
      refreshAttempts = 0; // Reset para próximas sesiones
      clearAuthAndRedirect();
      return Promise.reject({
        status: 401,
        message: 'Authentication failed - max attempts reached',
        isAuthError: true,
      });
    }

    // Evitar múltiples refreshes simultáneos
    if (isRefreshing) {
      console.log('🔄 Refresh already in progress, waiting...');
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verificar si ahora tenemos accessToken
      if (await hasAccessToken()) {
        console.log(
          '✅ AccessToken now available, retrying original request...'
        );
        refreshAttempts = 0; // Reset en caso de éxito
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

    console.log(
      `🔄 Starting refresh process... (attempt ${
        refreshAttempts + 1
      }/${MAX_REFRESH_ATTEMPTS})`
    );
    isRefreshing = true;
    refreshAttempts++;

    try {
      // ✅ Usar cliente especial para refresh
      const refreshResponse = await REFRESH_CLIENT.get('/auth/refresh');
      console.log('✅ Refresh response:', refreshResponse.status);

      // ✅ Caso 2: Refresh exitoso - Intentar request directamente
      if (refreshResponse.status === 200) {
        // Esperar un poco para que las cookies se establezcan
        await new Promise((resolve) => setTimeout(resolve, 500));

        console.log(
          '✅ Refresh successful, retrying original request directly...'
        );
        try {
          // Crear nueva instancia para el retry
          const retryClient = axios.create(options);
          const retryResponse = await retryClient(error.config);
          console.log('✅ Retry successful, resetting attempts counter');
          refreshAttempts = 0; // Reset en caso de éxito
          return retryResponse;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (retryError) {
          console.log(
            '❌ Retry with fresh client failed, checking with hasAccessToken...'
          );
          // Si el retry falla, entonces verificar con hasAccessToken
          if (await hasAccessToken()) {
            console.log('✅ AccessToken verified, retrying with API client...');
            refreshAttempts = 0; // Reset en caso de éxito
            return API(error.config);
          } else {
            console.log('❌ No accessToken after successful refresh');
            // No resetear attempts aquí, para que el siguiente intento pueda fallar rápido
            console.log(
              `🔄 Will retry... (${refreshAttempts}/${MAX_REFRESH_ATTEMPTS})`
            );
            clearAuthAndRedirect();
            return Promise.reject({
              status: 401,
              message: 'Authentication failed',
              isAuthError: true,
            });
          }
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
        refreshAttempts = 0; // Reset para próximas sesiones
        clearAuthAndRedirect();
        return Promise.reject({
          status: 401,
          message: 'Authentication failed',
          isAuthError: true,
        });
      }

      // Cualquier otro error de refresh
      console.log('🚨 Unexpected refresh error, clearing cache...');
      refreshAttempts = 0; // Reset para próximas sesiones
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

// --- Interceptors Avanzados ---
// NOTA: Ahora con AuthGuard sin race condition, podemos usar el refresh avanzado
API.interceptors.response.use((response) => response, errorHandling);
ANIMAL_API.interceptors.response.use((response) => response, errorHandling);

export { ANIMAL_API };
export default API;
