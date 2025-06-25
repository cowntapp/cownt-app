import { z } from 'zod';
import { passwordSchema } from '../../schemas/userFormSchemas';

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
