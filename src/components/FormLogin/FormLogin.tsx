"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {GenericResponse} from "@/dto/GenericResponse";
import {formLoginSchema} from "@/components/FormLogin/FormLoginSchema";

export default function FormLogin() {
    const form = useForm<z.infer<typeof formLoginSchema>>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {username: "", password: ""}
    })

    const onSubmit = async function(values: z.infer<typeof formLoginSchema>) {
        const rawResponse = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values),
            credentials: 'include',
            cache: 'no-cache',
        });
        const {statusCode} : GenericResponse<Boolean> = await rawResponse.json();
        if(statusCode === 200) {
            console.log("Login successful");
        } else {
            console.log("Login failed");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="kemalyilmaz" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter your username.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="*********" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter your password
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}