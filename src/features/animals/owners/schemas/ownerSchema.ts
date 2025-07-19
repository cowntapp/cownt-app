import z from 'zod';

export type OwnerFormData = z.infer<typeof ownerSchema>;
export const ownerSchema = z.object({
  value: z
    .string()
    .min(1, 'Nom de Propietari ha de tenir 1 caràcter mínim')
    .max(40, 'Nom de Propietari pot tenir 40 caràcters màxim'),
});
