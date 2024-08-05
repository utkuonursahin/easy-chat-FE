import React from 'react';
import LoginForm from '@/components/LoginForm/LoginForm';
import Link from 'next/link';

export default function Login() {
    return (
        <section className="col-start-2 flex flex-col justify-center gap-4 lg:items-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-muted-foreground">Log into your account</p>
            </div>
            <LoginForm />
            <span className="self-center text-sm flex gap-1">
                Don't have an account?
                <Link href="/register" className="underline">
                    Register
                </Link>
            </span>
        </section>
    );
}
