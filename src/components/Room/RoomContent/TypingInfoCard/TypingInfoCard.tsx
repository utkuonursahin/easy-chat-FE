import React from 'react';
import { UserDto } from '@/dto/UserDto';

type TypingInfoCardProps = {
    users: UserDto[];
};

const TypingInfoCard = ({ users }: TypingInfoCardProps) => {
    return (
        <div className={`flex flex-col w-fit gap-1 px-4 py-2 rounded-md 'bg-primary/10'}`}>
            <p className="text-xs flex justify-between items-center gap-4">
                <span className="text-primary">{users.map((user) => user.username).join(', ')}</span>
            </p>
            <p className="text-secondary-foreground">Typing...</p>
        </div>
    );
};

export default TypingInfoCard;
