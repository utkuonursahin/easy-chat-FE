import { z } from 'zod';

export const personalSettingsFormSchema = z
    .object({
        username: z.string().optional(),
        email: z.string().email('Invalid email address.').optional(),
        oldPassword: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters.'
            })
            .optional()
            .or(z.literal('')),
        newPassword: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters.'
            })
            .optional()
            .or(z.literal('')),
        confirmPassword: z
            .string()
            .min(8, {
                message: 'Password must be at least 8 characters.'
            })
            .optional()
            .or(z.literal(''))
    })
    .refine(
        (data) => {
            return !(data.oldPassword?.length === 0 && data.newPassword?.length !== 0);
        },
        {
            message: 'Old password is required.',
            path: ['oldPassword']
        }
    )
    .refine(
        (data) => {
            return data.newPassword?.length !== 0 ? data.newPassword === data.confirmPassword : true;
        },
        {
            message: 'Passwords do not match.',
            path: ['confirmPassword']
        }
    );
