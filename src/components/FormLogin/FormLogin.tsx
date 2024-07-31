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
import { userAtom } from '@/stores/stores';
import { useSetAtom } from 'jotai';
import { useHttp } from '@/hooks/useHttp';
import { toast } from 'sonner';

export default function FormLogin() {
    const form = useForm<z.infer<typeof formLoginSchema>>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: { email: '', password: '' }
    });
    const router = useRouter();
    const setUserAtom = useSetAtom(userAtom);
    const httpClient = useHttp();

    const onSubmit = async function (values: z.infer<typeof formLoginSchema>) {
        const { data: user, statusCode }: GenericResponse<UserDto> = await httpClient
            .setBody(JSON.stringify(values))
            .post('http://localhost:8080/api/auth/login');
        setUserAtom(user);
        if (statusCode === 200) {
            toast.success(`Welcome back, ${user.username}`, {
                description: 'You have successfully logged in.'
            });
            router.push('/chatrooms');
        } else toast.error('Sorry, your credentials seem invalid.', { description: 'Please try again.' });
    };

    return (
        <Form.Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
