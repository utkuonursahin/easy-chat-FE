import React from 'react';
import LoginForm from '@/components/LoginForm/LoginForm';

export default function Login() {
    return (
        <section className="col-start-2 flex flex-col justify-center gap-4">
            <h1 className="text-3xl text-foreground mb-8">Log into your account</h1>
            <LoginForm />
            <span className="self-center text-sm flex gap-1">
                Don't have an account?
                <a className="underline cursor-pointer">Register</a>or
                <a href="/" className="underline cursor-pointer">
                    go back
                </a>
            </span>
        </section>
    );
}
