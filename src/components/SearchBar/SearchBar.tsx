'use client'

import React from 'react';
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {roomSearchInputAtom, roomSearchResultAtom} from "@/stores/stores";
import {Button} from "@/components/ui/button";
import {useHttp} from "@/hooks/useHttp";
import {ChatRoomDto} from "@/dto/ChatRoomDto";

type SearchBarProps = {
    label?: string;
    placeholder?: string;
}

const SearchBar = ({label} : SearchBarProps) => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <Label className="font-thin">{label}</Label>
            <SearchBar.SearchInput/>
            <SearchBar.SearchBtn/>
        </div>
    );
};

SearchBar.SearchInput = function SearchInput(){
    const [search,setSearch] = useAtom(roomSearchInputAtom)
    return (
        <Input value={search} onChange={el => setSearch(el.target.value)} placeholder={"Search a room id"}/>
    )
}

SearchBar.SearchBtn = function SearchBtn(){
    const httpClient = useHttp()
    const searchId = useAtomValue(roomSearchInputAtom)
    const setRoomSearchResult = useSetAtom(roomSearchResultAtom)

    const findRoom = async () => {
        try{
            const {data: chatRoom} = await httpClient.get<ChatRoomDto>(`http://localhost:8080/api/chat-rooms/${searchId}`)
            setRoomSearchResult(chatRoom)
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <Button type="button" onClick={() => findRoom()} className="bg-blue-500 text-white p-2 rounded-md">Search</Button>
    )
}

export default SearchBar;