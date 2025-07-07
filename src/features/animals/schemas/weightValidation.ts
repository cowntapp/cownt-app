import { z } from 'zod';

// Schema para validar el peso de un animal
export const weightSchema = z
  .string()
  .refine(
    (val) => {
      // Permitir string vacío (se convertirá a null)
      if (val.trim() === '') return true;

      // Verificar que sea un número válido
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: 'El pes ha de ser un número positiu vàlid',
    }
  )
  .refine(
    (val) => {
      // Verificar longitud según backend (min 1, max 10)
      const trimmed = val.trim();
      return trimmed === '' || (trimmed.length >= 1 && trimmed.length <= 10);
    },
    {
      message: 'El pes ha de tenir entre 1 i 10 caràcters',
    }
  );

export type WeightSchema = z.infer<typeof weightSchema>;

// Función helper para validar y obtener errores
export const validateWeight = (
  weight: string
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
