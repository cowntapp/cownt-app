import { z } from 'zod';
import { emailSchema } from '../../schemas/userFormSchemas';

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;
export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});
