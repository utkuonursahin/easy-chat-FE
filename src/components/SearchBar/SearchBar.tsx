'use client'

import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useAtom} from "jotai";
import {findRoomSearchAtom} from "@/stores/stores";

type SearchBarProps = {
    label?: string;
    placeholder?: string;
}

const SearchBar = ({label} : SearchBarProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="font-thin">{label}</Label>
            <SearchBar.SearchInput/>
            <SearchBar.SearchBtn/>
        </div>
    );
};

SearchBar.SearchInput = function SearchInput(){
    const [search,setSearch] = useAtom(findRoomSearchAtom)
    return (
        <Input value={search} onChange={el => setSearch(el.target.value)} placeholder={"Search a room id"}/>
    )
}

SearchBar.SearchBtn = function SearchBtn(){
    return (
        <button className="bg-blue-500 text-white p-2 rounded-md">Search</button>
    )
}

export default SearchBar;