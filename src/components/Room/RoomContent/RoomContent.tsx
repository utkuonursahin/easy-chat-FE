'use client';
import React from 'react';
import {PaginatedMessageDto} from "@/dto/PaginatedMessageDto";
import {UserDto} from "@/dto/UserDto";

type RoomContentProps = {
    messages: PaginatedMessageDto;
}

const RoomContent = ({messages}: RoomContentProps) => {
    const user = JSON.parse(window.localStorage.getItem('user')!) as UserDto;
    return (
        <div className="flex flex-col-reverse gap-2">
            {messages.content.map((message) => (
                <div key={message.id} className={`flex flex-col w-full gap-1 px-4 py-2 rounded-lg ${user.id === message.sender.id ? 'text-right bg-primary/30' : 'text-left bg-primary/10'}`}>
                    <p className="text-xs flex justify-between items-center">
                        <span className="text-primary">{message.sender.username}</span>
                        <span>{new Date(message.createdAt).toLocaleString('tr-TR')}</span>
                    </p>
                    <p className="text-secondary-foreground">{message.content}</p>
                </div>
            ))}
        </div>
    );
};

export default RoomContent;