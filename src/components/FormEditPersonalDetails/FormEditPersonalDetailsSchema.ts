import {z} from 'zod';

export const formEditPersonalDetailsSchema = z.object({
    username: z.string(),
    oldPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters.'
    }),
    newPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters.'
    }),
    confirmPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters.'
    }),
    email: z.string().email("Invalid email address")
});