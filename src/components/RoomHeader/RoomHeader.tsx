import React from 'react';
import {ChatRoomDto} from "@/dto/ChatRoomDto";

type RoomHeaderProps = {
    data: ChatRoomDto
}

const RoomHeader = ({data}: RoomHeaderProps) => {
    return (
        <header className="bg-primary/10 w-full p-4 rounded-lg">
            <p>
                <span className="capitalize">{data.name}</span>
            </p>
        </header>
    );
};

export default RoomHeader;