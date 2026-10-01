import { z } from 'zod';

const email = z.string().trim().toLowerCase().email('Enter a valid email address.').max(254);
export const passwordSchema = z
  .string()
  .min(10, 'Use at least 10 characters for your password.')
  .refine(
    (value) => new TextEncoder().encode(value).length <= 72,
    'Your password must be 72 bytes or fewer.',
  );

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, 'Enter your name.').max(80),
    email,
    password: passwordSchema,
  })
  .strict();

export const loginSchema = z
  .object({
    email,
    password: z
      .string()
      .min(1)
      .refine((value) => new TextEncoder().encode(value).length <= 72),
  })
  .strict();

export const projectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Give your project a name.')
      .max(100, 'Project names can be up to 100 characters.'),
    description: z
      .string()
      .trim()
      .max(2000, 'Descriptions can be up to 2,000 characters.')
      .optional()
      .default('')
      .transform((value) => value || null),
    status: z.enum(['draft', 'in_progress', 'completed']).default('draft'),
  })
  .strict();

export function isSafeWebsite(value: string) {
  if (!value) return true;
  try {
    return ['https:', 'http:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

export const profileSchema = z
  .object({
    name: z.string().trim().min(1, 'Enter your name.').max(80),
    username: z
      .string()
      .trim()
      .toLowerCase()
      .max(30)
      .refine(
        (value) => !value || /^[a-z0-9_]{3,30}$/.test(value),
        'Use 3–30 letters, numbers, or underscores for your username.',
      )
      .transform((value) => value || null),
    website: z
      .string()
      .trim()
      .max(300)
      .refine(isSafeWebsite, 'Use a complete http:// or https:// website address.')
      .transform((value) => value || null),
  })
  .strict();

export const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Enter your current password.')
      .refine((value) => new TextEncoder().encode(value).length <= 72),
    newPassword: passwordSchema,
  })
  .strict()
  .refine((value) => value.currentPassword !== value.newPassword, {
    message: 'Choose a different password.',
    path: ['newPassword'],
  });

export const projectIdSchema = z.string().uuid('Invalid project ID.');
