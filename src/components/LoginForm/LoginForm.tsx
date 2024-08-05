'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import * as Form from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GenericResponse } from '@/dto/GenericResponse';
import { loginFormSchema } from '@/components/LoginForm/LoginFormSchema';
import { useRouter } from 'next/navigation';
import { UserDto } from '@/dto/UserDto';
import { userAtom } from '@/stores/stores';
import { useSetAtom } from 'jotai';
import { useHttp } from '@/hooks/useHttp';
import { toast } from 'sonner';

export default function LoginForm() {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: { email: '', password: '' }
    });
    const router = useRouter();
    const setUserAtom = useSetAtom(userAtom);
    const httpClient = useHttp();

    const onSubmit = async function (values: z.infer<typeof loginFormSchema>) {
        const {
            data: user,
            statusCode,
            message
        }: GenericResponse<UserDto> = await httpClient
            .setBody(JSON.stringify(values))
            .post('http://localhost:8080/api/auth/login');
        if (statusCode === 200) {
            setUserAtom(user);
            toast.success(`Welcome back, ${user.username}`, {
                description: 'You have successfully logged in.'
            });
            router.push('/chatrooms');
        } else toast.error(`Sorry, login attempt failed: ${message}`, { description: 'Please try again.' });
    };

    return (
        <Form.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:w-1/2 gap-4">
                <Form.FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <Form.FormItem>
                            <Form.FormLabel>Email</Form.FormLabel>
                            <Form.FormControl>
                                <Input placeholder="marcus@mail.com" {...field} />
                            </Form.FormControl>
                            <Form.FormDescription>Enter your email</Form.FormDescription>
                            <Form.FormMessage />
                        </Form.FormItem>
                    )}
                />
                <Form.FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <Form.FormItem>
                            <Form.FormLabel>Password</Form.FormLabel>
                            <Form.FormControl>
                                <Input type="password" placeholder="*********" {...field} />
                            </Form.FormControl>
                            <Form.FormDescription>Enter your password</Form.FormDescription>
                            <Form.FormMessage />
                        </Form.FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form.Form>
    );
}
