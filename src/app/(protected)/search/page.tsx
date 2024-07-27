import React from 'react';
import SearchBar from "@/components/SearchBar/SearchBar";
const Page = () => {
    return (
        <section className="p-10 flex flex-col items-center gap-8">
            <h2 className="text-2xl font-thin">Find Your Friends' Room</h2>
            <SearchBar label="Room Id: " />
        </section>
    );
};

export default Page;