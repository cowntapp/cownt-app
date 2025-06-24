import { useParams } from 'react-router';

export const useRouterParams = <T extends string>(...paramKeys: T[]) => {
  const params = useParams();
  const missing = paramKeys.filter((key) => !params[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required route param(s): ${missing.join(', ')}.\n` +
        `Available params: ${
          Object.keys(params).length ? JSON.stringify(params) : 'none'
        }\n` +
        `- Ensure your route path includes ":${missing.join('", "')}"\n` +
        `- Or check that this component is rendered inside a route with these params.`
    );
  }
  // Devuelve solo los params confirmados y tipados
  return paramKeys.reduce((acc, key) => {
    acc[key] = params[key]!;
    return acc;
  }, {} as Record<T, string>);
};
