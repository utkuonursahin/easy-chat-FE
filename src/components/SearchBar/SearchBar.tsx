'use client'

import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useAtom} from "jotai";
import {findRoomSearchAtom} from "@/stores/stores";

type SearchBarProps = {
    label?: string;
    placeholder?: string;
    children: React.ReactNode;
}

const SearchBar = ({label,children} : SearchBarProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="font-thin">{label}</Label>
            {children}
        </div>
    );
};

SearchBar.FindRoom = function SearchBarFindRoom(){
    const [search,setSearch] = useAtom(findRoomSearchAtom)
    return (
        <Input value={search} onChange={el => setSearch(el.target.value)} placeholder={"Search a room id"}/>
    )
}

export default SearchBar;