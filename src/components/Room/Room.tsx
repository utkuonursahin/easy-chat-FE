import React from 'react';

type RoomProps = {
    children?: React.ReactNode;
}

const Room = ({children}: RoomProps) => {
    return (
        <div className="p-4 w-full h-full grid grid-rows-[min-content,1fr,min-content] gap-4">
            {children}
        </div>
    );
};

export default Room;