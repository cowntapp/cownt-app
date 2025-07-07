import { z } from 'zod';

// Schema para validar characteristics (array de strings)
export const characteristicsSchema = z.array(z.string()).refine(
  (characteristics) => {
    // Verificar que no haya duplicados
    const uniqueCharacteristics = new Set(characteristics);
    return uniqueCharacteristics.size === characteristics.length;
  },
  {
    message: 'No es poden tenir característiques duplicades',
  }
);

export type CharacteristicsSchema = z.infer<typeof characteristicsSchema>;

// Función helper para validar y obtener errores
export const validateCharacteristics = (
  characteristics: string[]
): { isValid: boolean; error?: string } => {
  const result = characteristicsSchema.safeParse(characteristics);

  if (result.success) {
    return { isValid: true };
  }

  return {
    isValid: false,
    error: result.error.errors[0]?.message || 'Error de validació',
  };
};
