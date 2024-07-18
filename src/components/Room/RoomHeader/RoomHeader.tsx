import React from 'react';

type RoomHeaderProps = {
    children?: React.ReactNode;
}

const RoomHeader = ({children}: RoomHeaderProps) => {
    return (
        <header className="bg-primary/10 w-full p-4 rounded-lg">
            {children}
        </header>
    );
};

export default RoomHeader;