import React from 'react';
import PersonalSettingsForm from '@/components/PersonalSettingsForm/PersonalSettingsForm';
import LogoutButton from '@/components/LogoutButton/LogoutButton';

const Page = () => {
    return (
        <section className="overflow-y-scroll w-full flex flex-col gap-4 bg-background text-foreground p-4 md:p-6 lg:p-8">
            <header>
                <h1 className="text-2xl font-semibold text-primary">Settings</h1>
            </header>
            <div className="grid gap-4">
                <PersonalSettingsForm />
                <LogoutButton />
            </div>
        </section>
    );
};

export default Page;
