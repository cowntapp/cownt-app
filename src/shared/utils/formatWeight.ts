/**
 * Formatea un peso (como string) añadiendo la unidad "kg" si es válido
 * @param weight - Peso como string (ej: "650", "650.5")
 * @returns Peso formateado como "XXX kg" o null si no hay peso válido
 */
export const formatWeight = (weight: string | null): string | null => {
  if (!weight) return null;

  try {
    // Limpiar el string y convertir a número
    const cleanWeight = weight.trim();
    const numericWeight = Number(cleanWeight);

    // Verificar que es un número válido y positivo
    if (isNaN(numericWeight) || numericWeight <= 0) {
      return null;
    }

    // Formatear con hasta 1 decimal si es necesario
    const formatted =
      numericWeight % 1 === 0
        ? numericWeight.toString()
        : numericWeight.toFixed(1);

    return `${formatted} kg`;
  } catch (error) {
    console.error('Error formatting weight:', error);
    return null;
  }
};
