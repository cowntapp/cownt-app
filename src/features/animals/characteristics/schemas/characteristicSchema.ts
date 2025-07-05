import { z } from 'zod';

export type CharacteristicFormData = z.infer<typeof characteristicSchema>;
export const characteristicSchema = z.object({
  value: z
    .string()
    .min(2, 'Nom de Característica ha de tenir 2 caràcters mínim')
    .max(20, 'Nom de Característica pot tenir 20 caràcters màxim'),
});
