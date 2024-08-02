import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
    return (
        <section className="col-start-2 flex flex-col gap-16 justify-center items-center">
            <h1 className="flex flex-col gap-4 text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-cyan-600 to-green-600 ">
                Easy chat with your loved ones!
                <span className="text-neutral-700 font-normal text-base">
                    No subscription, no privacy leak, no limit...
                </span>
            </h1>
            <div className="flex flex-col gap-4">
                <p className="text-center text-primary">Now, get ready and</p>
                <Button className="bg-primary w-64">
                    <a className="w-full h-full flex items-center justify-center" href="/login">
                        Login
                    </a>
                </Button>
                <a href="/register" className="btn btn-secondary">
                    Don't have an account? <span className="underline">Register</span>
                </a>
            </div>
        </section>
    );
};

export default Hero;
