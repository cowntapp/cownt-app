import { z } from 'zod';

// Schema para validar precios (buyPrice y salePrice)
export const priceSchema = z
  .string()
  .refine(
    (val) => {
      // Permitir string vacío (se convertirá a null)
      if (val.trim() === '') return true;

      // Verificar que sea un número válido no negativo
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    },
    {
      message: 'El preu ha de ser un número no negatiu vàlid',
    }
  )
  .refine(
    (val) => {
      // Verificar que sea un entero (según backend)
      const trimmed = val.trim();
      if (trimmed === '') return true;

      const num = parseFloat(trimmed);
      return Number.isInteger(num);
    },
    {
      message: 'El preu ha de ser un número enter',
    }
  );

export type PriceSchema = z.infer<typeof priceSchema>;

// Función helper para validar y obtener errores
export const validatePrice = (
  price: string
): { isValid: boolean; error?: string } => {
  const result = priceSchema.safeParse(price);

  if (result.success) {
    return { isValid: true };
  }

  return {
    isValid: false,
    error: result.error.errors[0]?.message || 'Error de validació',
  };
};
