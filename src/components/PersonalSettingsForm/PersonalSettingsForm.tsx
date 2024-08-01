'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import personalSettingsFormSchema from '@/components/PersonalSettingsForm/PersonalSettingsFormSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/stores/stores';

const PersonalSettingsForm = () => {
    const user = useAtomValue(userAtom);
    const form = useForm<z.infer<typeof personalSettingsFormSchema>>({
        resolver: zodResolver(personalSettingsFormSchema),
        defaultValues: {
            username: user.username,
            email: user.email
        }
    });
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Username</CardTitle>
                    <CardDescription>Update your username.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-rows-[repeat(2,min-content)] grid-cols-[1fr,min-content] gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input className="row-start-2" id="username" placeholder="Enter your username" />
                    <Button className="col-start-2 row-start-2">Save</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Email</CardTitle>
                    <CardDescription>Update your email.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-rows-[repeat(2,min-content)] grid-cols-[1fr,min-content] gap-2">
                    <Label htmlFor="username">Email</Label>
                    <Input className="row-start-2" id="username" placeholder="Enter your email" />
                    <Button className="col-start-2 row-start-2">Save</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="old-password">Old Password</Label>
                        <Input id="old-password" type="password" placeholder="Enter old password" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" placeholder="Enter new password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </>
    );
};

export default PersonalSettingsForm;
