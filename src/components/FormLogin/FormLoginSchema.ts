import {z} from 'zod';

export const formLoginSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.'
    })
});
