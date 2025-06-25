import z from 'zod';
import { emailSchema, passwordSchema } from '../../schemas/userFormSchemas';

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
const registerFormSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default registerFormSchema;
