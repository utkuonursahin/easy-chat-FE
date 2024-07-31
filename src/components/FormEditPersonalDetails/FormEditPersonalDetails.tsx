'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import * as Form from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { userAtom } from '@/stores/stores';
import { formEditPersonalDetailsSchema } from '@/components/FormEditPersonalDetails/FormEditPersonalDetailsSchema';

const FormEditPersonalDetails = () => {
    const [user, setUser] = useAtom(userAtom);
    const form = useForm<z.infer<typeof formEditPersonalDetailsSchema>>({
        resolver: zodResolver(formEditPersonalDetailsSchema),
        defaultValues: { email: user.email, oldPassword: '' }
    });

    const onSubmit = async function (values: z.infer<typeof formEditPersonalDetailsSchema>) {};

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
                                <Input value={field.value} />
                            </Form.FormControl>
                            <Form.FormDescription>Enter your email</Form.FormDescription>
                            <Form.FormMessage />
                        </Form.FormItem>
                    )}
                />
                <Form.FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                        <Form.FormItem>
                            <Form.FormLabel>Password</Form.FormLabel>
                            <Form.FormControl>
                                <Input type="password" {...field} />
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
};

export default FormEditPersonalDetails;
