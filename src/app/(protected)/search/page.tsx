import React from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import RoomSearchResult from '@/components/RoomSearchResult/RoomSearchResult';

const Page = () => {
    return (
        <section className="flex flex-col items-center gap-4 p-4">
            <header className="self-start">
                <h1 className="text-2xl font-semibold text-primary">Search Room</h1>
            </header>
            <SearchBar label="Room Id: " />
            <RoomSearchResult />
        </section>
    );
};

export default Page;
