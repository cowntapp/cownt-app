import { LOCALE } from '@/config/consts/configConsts';

/**
 * Formatea un timestamp (en milisegundos como string) a formato dd/mm/aaaa
 * @param timestamp - Timestamp en milisegundos como string
 * @returns Fecha formateada como dd/mm/aaaa o null si no hay fecha o hay error
 */
export const formatDate = (timestamp: string | null): string | null => {
  if (!timestamp) return null;

  try {
    const formattedDate = Intl.DateTimeFormat(LOCALE, {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }).format(new Date(Number(timestamp)));

    return formattedDate;
  } catch (error) {
    console.error('Error formatting date:', error);
    return null;
  }
};
