'use client';
import React from 'react';
import SearchBar from "@/components/SearchBar/SearchBar";

const FindRoomSearchBar = () => {
    return (
        <SearchBar label="Room Id:">
            <SearchBar.FindRoom/>
        </SearchBar>
    );
};

export default FindRoomSearchBar;