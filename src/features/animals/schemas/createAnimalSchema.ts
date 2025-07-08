import { z } from 'zod';
import { SEX, ORIGIN, ABSENCE } from '../consts/animal.consts';

function validateDate(val: string) {
  const ms = Number(val);
  return !isNaN(ms) && !isNaN(new Date(ms).getTime());
}

// Animal Create Schema
export type CreateAnimalSchema = z.infer<typeof createAnimalSchema>;
export const createAnimalSchema = z
  .object({
    longCode: z.string().min(10).max(16),
    breed: z.string(),
    sex: z.nativeEnum(SEX),
    birthDate: z
      .string()
      .optional()
      .refine(
        (val) => val === undefined || validateDate(val),
        'birthDate must be a valid date timestamp in milliseconds'
      ),
    weight: z
      .string()
      .optional()
      .refine((val) => {
        if (val === undefined || val === '') return true;
        const num = Number(val);
        return !isNaN(num) && num > 0 && num <= 9999;
      }, 'Weight must be a positive number less than or equal to 9999'),
    origin: z.nativeEnum(ORIGIN),
    buyPrice: z.number().nonnegative().int().optional(),
    salePrice: z.number().nonnegative().int().optional(),
    absence: z.nativeEnum(ABSENCE).nullable(),
    characteristics: z.array(z.string()).optional(),
    mother: z.string().optional(),
    children: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    // origin rules
    if (data.origin === ORIGIN.BORN) {
      if (!data.mother) {
        ctx.addIssue({
          path: ['mother'],
          message: 'Mother is required when origin is Born',
          code: z.ZodIssueCode.custom,
        });
      }
      if (data.birthDate === undefined) {
        ctx.addIssue({
          path: ['birthDate'],
          message: 'birthDate is required when origin is Born',
          code: z.ZodIssueCode.custom,
        });
      }
    } else if (data.origin === ORIGIN.BOUGHT) {
      if (data.mother) {
        ctx.addIssue({
          path: ['mother'],
          message: 'Mother must be null when origin is Bought',
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export default createAnimalSchema;
