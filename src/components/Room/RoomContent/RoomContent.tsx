'use client';
import React, { useEffect } from 'react';
import { PaginatedMessageDto } from '@/dto/PaginatedMessageDto';
import { UserDto } from '@/dto/UserDto';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import { useAtom } from 'jotai';
import { messagesAtom, socketAtom } from '@/stores/stores';
import { MessageDto } from '@/dto/MessageDto';
import { io } from 'socket.io-client';

type RoomContentProps = {
    room: ChatRoomDto;
    messages: PaginatedMessageDto;
};

const messagesDateFormat = new Intl.DateTimeFormat('en-GB', {
    hourCycle: 'h24',
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
});

const RoomContent = ({ room, messages }: RoomContentProps) => {
    const user = JSON.parse(window.localStorage.getItem('user')!) as UserDto;
    const [msgAtom, setMsgAtom] = useAtom(messagesAtom);
    const [socket, setSocket] = useAtom(socketAtom);

    const onGetMessageEvent = (message: MessageDto) => {
        setMsgAtom((prev) => [message, ...prev]);
    };

    useEffect(() => {
        setMsgAtom(messages.content);
        if (!socket) setSocket(io('ws://192.168.1.5:8085'));
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.emit('join_room', room);
        socket.on('get_message', onGetMessageEvent);
        return () => {
            socket.emit('leave_room', room);
            socket.disconnect();
            setSocket(null);
        };
    }, [socket]);

    return (
        <div className="flex flex-col-reverse py-2 gap-2 overflow-y-scroll">
            {msgAtom.map((message, index) => (
                <div
                    key={message.id || index}
                    className={`flex flex-col w-fit gap-1 px-4 py-2 rounded-lg ${user.id === message.sender.id ? 'text-right bg-primary/30 self-end' : 'text-left bg-primary/10'}`}
                >
                    <p className="text-xs flex justify-between items-center gap-4">
                        <span className="text-primary">
                            {user.id === message.sender.id ? 'Me' : message.sender.username}
                        </span>
                        <span>{messagesDateFormat.format(new Date(message.createdAt))}</span>
                    </p>
                    <p className="text-secondary-foreground">{message.content}</p>
                </div>
            ))}
        </div>
    );
};

export default RoomContent;
