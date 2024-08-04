import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="col-start-2 flex flex-col gap-16 justify-center items-center">
            <h1 className="flex flex-col gap-4 text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-cyan-600 to-green-600 ">
                Easy chat with your loved ones!
                <span className="text-neutral-700 font-normal text-base">
                    No data selling, no privacy leak...
                </span>
            </h1>
            <div className="flex flex-col items-center gap-4">
                <p className="text-center text-primary">Now, get ready and</p>
                <Button className="bg-primary w-64">
                    <Link className="w-full h-full flex items-center justify-center" href="/register">
                        Register
                    </Link>
                </Button>
                <Link href="/login" className="btn btn-secondary">
                    Do you have an account? <span className="underline">Login</span>
                </Link>
            </div>
        </section>
    );
};

export default Hero;
