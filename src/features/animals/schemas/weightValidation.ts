import { z } from 'zod';

// Schema para validar el peso de un animal
export const weightSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (val === undefined || val === '') return true;
      const num = Number(val);
      return !isNaN(num) && num > 0 && num <= 9999;
    },
    {
      message:
        'El pes ha de ser un número positiu vàlid i menor o igual a 9999',
    }
  );

export type WeightSchema = z.infer<typeof weightSchema>;

// Función helper para validar y obtener errores
export const validateWeight = (
  weight: string | undefined
): { isValid: boolean; error?: string } => {
  const result = weightSchema.safeParse(weight);

  if (result.success) {
    return { isValid: true };
  }

  return {
    isValid: false,
    error: result.error.errors[0]?.message || 'Error de validació',
  };
};
