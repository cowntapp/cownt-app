import { z } from 'zod';
import { emailSchema } from '../../schemas/schemas';

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;
export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});
