import { z } from 'zod';

export type BreedFormData = z.infer<typeof breedSchema>;
export const breedSchema = z.object({
  value: z
    .string()
    .min(2, 'Nom de Raça ha de tenir 2 caràcters mínim')
    .max(20, 'Nom de Raça pot tenir 20 caràcters mínim'),
});
