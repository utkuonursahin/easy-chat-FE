'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginFormSchema } from '@/components/LoginForm/LoginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormSchema } from '@/components/RegisterForm/RegisterFormSchema';
import * as Form from '@/components/ui/form';
import { useHttp } from '@/hooks/useHttp';
import { GenericResponse } from '@/dto/GenericResponse';
import { UserDto } from '@/dto/UserDto';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: { email: '', password: '' }
    });
    const httpClient = useHttp();
    const router = useRouter();

    const onSubmit = async function (values: z.infer<typeof loginFormSchema>) {
        const {
            data: user,
            statusCode,
            message
        }: GenericResponse<UserDto> = await httpClient
            .setBody(JSON.stringify(values))
            .post('http://localhost:8080/api/auth/register');
        if (statusCode === 201) {
            toast.success(`Welcome, ${user.username}!`, {
                description:
                    'You have successfully created your account. You are being redirected to the login page.'
            });
            router.push('/login');
        } else if (statusCode === 409) {
            toast.error(`An account with this email is already exists.`, {
                description: 'Please try another email or login.'
            });
        }
    };
    return (
        <Form.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:w-1/2 gap-4">
                <Form.FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <Form.FormItem>
                            <Form.FormLabel>Username</Form.FormLabel>
                            <Form.FormControl>
                                <Input placeholder="marcus" {...field} />
                            </Form.FormControl>
                            <Form.FormDescription>Select your username</Form.FormDescription>
                            <Form.FormMessage />
                        </Form.FormItem>
                    )}
                />
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
                <Button type="submit">Register</Button>
            </form>
        </Form.Form>
    );
};

export default RegisterForm;
