import React from 'react';
import FindRoomSearchBar from "@/components/SearchBar/FindRoomSearchBar";
const Page = () => {
    return (
        <section className="p-10 flex flex-col items-center gap-8">
            <h2 className="text-2xl font-thin">Find Your Friends' Room</h2>
            <FindRoomSearchBar/>
        </section>
    );
};

export default Page;