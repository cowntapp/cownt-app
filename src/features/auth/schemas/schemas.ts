import z from 'zod';

export const emailSchema = z.string().email().min(1).max(255);
export const passwordSchema = z.string().min(6).max(255);
