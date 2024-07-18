import React from 'react';
import {ChatRoomDto} from "@/dto/ChatRoomDto";

type RoomProps = {
    roomData: ChatRoomDto;
    children?: React.ReactNode;
}

const Room = ({roomData,children}: RoomProps) => {
    return (
        <div className="w-full h-full grid grid-rows-[min-content,1fr,min-content] gap-4">
            {children}
        </div>
    );
};

export default Room;