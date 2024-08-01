import { z } from 'zod';

const personalSettingsFormSchema = z.object({
    username: z.string(),
    email: z.string().email('Invalid email address.'),
    oldPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters.'
    }),
    newPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters.'
    }),
    confirmPassword: z.string().min(8, {
        message: 'Password must be at least 8 characters.'
    })
});

personalSettingsFormSchema.refine((obj) => obj.newPassword === obj.confirmPassword, {
    message: 'Passwords do not match.'
});

export default personalSettingsFormSchema;
