import { menuData } from '../data/appConfigData';

export const HAS_LANDING = true;
export const HAS_WORKSPACES = !!menuData.workspaces?.length;
export const LOCALE = 'es-ES';
// TODO: review
// export const LOCALE =
//   typeof window !== 'undefined' ? navigator.language || 'es-ES' : 'es-ES';
