import { z } from 'zod';
import { validateDate } from './createAnimalSchema';

// Schema para validar el peso de un animal
export const deathDateSchema = z
  .string()
  .optional()
  .nullable()
  .refine(
    (val) => val === undefined || val === null || validateDate(val),
    'Data no vàlida'
  )
  .refine((val) => {
    if (val === undefined) return true;
    const timestamp = Number(val);
    const now = Date.now();
    return timestamp <= now; // no permitir fechas futuras
  }, 'Data futura no vàlida');

export type DeathDateSchema = z.infer<typeof deathDateSchema>;

// Función helper para validar y obtener errores
export const validateDeathDate = (
  deathDate: string | undefined | null
): { isValid: boolean; error?: string } => {
  const result = deathDateSchema.safeParse(deathDate);

  if (result.success) {
    return { isValid: true };
  }

  return {
    isValid: false,
    error: result.error.errors[0]?.message || 'Error de validació',
  };
};
