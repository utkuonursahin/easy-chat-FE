'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { personalSettingsFormSchema } from '@/components/PersonalSettingsForm/PersonalSettingsFormSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue, useSetAtom } from 'jotai';
import { userAtom } from '@/stores/stores';
import * as Form from '@/components/ui/form';
import { useHttp } from '@/hooks/useHttp';
import { toast } from 'sonner';
import { GenericResponse } from '@/dto/GenericResponse';
import { UserDto } from '@/dto/UserDto';

const PersonalSettingsForm = () => {
    const user = useAtomValue(userAtom);
    const form = useForm<z.infer<typeof personalSettingsFormSchema>>({
        resolver: zodResolver(personalSettingsFormSchema),
        defaultValues: {
            username: user.username,
            email: user.email,
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });
    const setUserAtom = useSetAtom(userAtom);
    const httpClient = useHttp();
    const handleFormSubmit = async (values: z.infer<typeof personalSettingsFormSchema>) => {
        const {
            data: updatedUser,
            statusCode,
            message
        }: GenericResponse<UserDto> = await httpClient
            .setBody(JSON.stringify(values))
            .patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/me`);
        if (statusCode === 200) {
            setUserAtom(updatedUser);
            form.reset({
                username: updatedUser.username,
                email: updatedUser.email,
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            toast.success(message);
        } else if (statusCode === 409) toast.error('Sorry, an account with this email already exists.');
        else toast.error(message);
    };
    return (
        <Form.Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Username</CardTitle>
                        <CardDescription className="text-primary">Update your username.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <Form.FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <Form.FormItem>
                                    <Form.FormLabel>Username</Form.FormLabel>
                                    <Form.FormControl>
                                        <Input
                                            {...field}
                                            id="username"
                                            placeholder="Enter your new username"
                                        />
                                    </Form.FormControl>
                                    <Form.FormMessage />
                                </Form.FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Email</CardTitle>
                        <CardDescription className="text-primary">Update your email.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-rows-[repeat(2,min-content)] grid-cols-[1fr,min-content] gap-2">
                        <Form.FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <Form.FormItem>
                                    <Form.FormLabel>Email</Form.FormLabel>
                                    <Form.FormControl>
                                        <Input {...field} id="email" placeholder="Enter your new email" />
                                    </Form.FormControl>
                                    <Form.FormMessage />
                                </Form.FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription className="text-primary">Change your password.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Form.FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <Form.FormItem>
                                    <Form.FormLabel>Old Password</Form.FormLabel>
                                    <Form.FormControl>
                                        <Input
                                            {...field}
                                            id="oldPassword"
                                            placeholder="Enter your old password"
                                        />
                                    </Form.FormControl>
                                    <Form.FormMessage />
                                </Form.FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Form.FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <Form.FormItem>
                                        <Form.FormLabel>New Password</Form.FormLabel>
                                        <Form.FormControl>
                                            <Input
                                                {...field}
                                                id="newPassword"
                                                placeholder="Enter your new password"
                                            />
                                        </Form.FormControl>
                                        <Form.FormMessage />
                                    </Form.FormItem>
                                )}
                            />
                            <Form.FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <Form.FormItem>
                                        <Form.FormLabel>Confirm Password</Form.FormLabel>
                                        <Form.FormControl>
                                            <Input
                                                {...field}
                                                id="confirmPassword"
                                                placeholder="Confirm your new password"
                                            />
                                        </Form.FormControl>
                                        <Form.FormMessage />
                                    </Form.FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
                <Button>Save</Button>
            </form>
        </Form.Form>
    );
};

export default PersonalSettingsForm;
