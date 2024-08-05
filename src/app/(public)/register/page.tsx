import React from 'react';
import Link from 'next/link';
import RegisterForm from '@/components/RegisterForm/RegisterForm';

const Page = () => {
    return (
        <section className="col-start-2 flex flex-col justify-center gap-4 lg:items-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold">Register</h1>
                <p className="text-muted-foreground">Create your account</p>
            </div>
            <RegisterForm />
            <p className="self-center text-sm">
                Do you have an account?{' '}
                <Link href="/login" className="underline">
                    Login
                </Link>
            </p>
        </section>
    );
};

export default Page;
