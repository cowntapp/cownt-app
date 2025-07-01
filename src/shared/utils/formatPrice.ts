import { LOCALE } from '@/config/consts/configConsts';

/**
 * Formatea un precio usando Intl.NumberFormat con configuración de locale
 * @param price - El precio como string, number o null
 * @returns String formateado con configuración internacional
 */
export const getFormattedPriceStringIntl = (
  price: string | number | null
): string | null => {
  const formatter = new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'EUR',
  });

  if (!price) {
    // Para valores vacíos, mostramos "- €" respetando el formato del locale
    return null;
  }

  const numPrice = typeof price === 'string' ? Number(price) : price;

  if (isNaN(numPrice)) {
    return null;
  }

  return formatter.format(numPrice);
};
