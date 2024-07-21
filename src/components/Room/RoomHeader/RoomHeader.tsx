import React from 'react';

type RoomHeaderProps = {
    children?: React.ReactNode;
}

const RoomHeader = ({children}: RoomHeaderProps) => {
    return (
        <header className="bg-primary/80  w-full p-4 rounded-lg text-primary-foreground flex justify-center">
            {children}
        </header>
    );
};

export default RoomHeader;