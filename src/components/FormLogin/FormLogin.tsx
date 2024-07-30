'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import * as Form from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GenericResponse } from '@/dto/GenericResponse';
import { formLoginSchema } from '@/components/FormLogin/FormLoginSchema';
import { useRouter } from 'next/navigation';
import { UserDto } from '@/dto/UserDto';

export default function FormLogin() {
    const form = useForm<z.infer<typeof formLoginSchema>>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: { username: '', password: '' }
    });
    const router = useRouter();

    const onSubmit = async function (values: z.infer<typeof formLoginSchema>) {
        const rawResponse = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
            credentials: 'include',
            cache: 'no-cache'
        });
        const response: GenericResponse<UserDto> = await rawResponse.json();
        localStorage.setItem('user', JSON.stringify(response.data));
        if (response.statusCode === 200) {
            router.push('/chatrooms');
        } else {
            console.log('Login failed');
        }
    };

    return (
        <Form.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Form.FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <Form.FormItem>
                            <Form.FormLabel>Username</Form.FormLabel>
                            <Form.FormControl>
                                <Input placeholder="kemalyilmaz" {...field} />
                            </Form.FormControl>
                            <Form.FormDescription>Enter your username.</Form.FormDescription>
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
