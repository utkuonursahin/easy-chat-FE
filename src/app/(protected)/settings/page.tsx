import React from 'react';
import PersonalSettingsForm from '@/components/PersonalSettingsForm/PersonalSettingsForm';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import { ScrollArea } from '@/components/ui/scroll-area';

const Page = () => {
    return (
        <section className="w-full flex flex-col gap-4 text-foreground p-4 lg:col-start-3">
            <header>
                <h1 className="text-2xl font-semibold text-primary">Settings</h1>
            </header>
            <ScrollArea>
                <div className="grid gap-4">
                    <PersonalSettingsForm />
                    <LogoutButton />
                </div>
            </ScrollArea>
        </section>
    );
};

export default Page;
