'use client';
import { useEffect, useState } from 'react';
import { PaginatedMessageDto } from '@/dto/PaginatedMessageDto';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import { useAtom, useSetAtom } from 'jotai';
import { messagesAtom, socketAtom } from '@/stores/stores';
import { MessageDto } from '@/dto/MessageDto';
import { io } from 'socket.io-client';
import MessagesList from '@/components/Room/RoomContent/MessagesList/MessagesList';
import { UserDto } from '@/dto/UserDto';
import TypingInfoCard from '@/components/Room/RoomContent/TypingInfoCard/TypingInfoCard';

type RoomContentProps = {
    room: ChatRoomDto;
    messages: PaginatedMessageDto;
};

const RoomContent = ({ room, messages }: RoomContentProps) => {
    const setMessagesAtom = useSetAtom(messagesAtom);
    const [socket, setSocket] = useAtom(socketAtom);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState<UserDto[]>([]);

    const onGetMessageEvent = (message: MessageDto) => {
        setMessagesAtom((prev) => [message, ...prev]);
    };

    const onTypingEvent = (user: UserDto) => {
        setIsTyping(true);
        setTypingUsers((prev) => [...prev, user]);
    };

    const onStopTypingEvent = (user: UserDto) => {
        setTypingUsers((prev) => prev.filter((u) => u.id !== user.id));
        if (typingUsers.length === 0) setIsTyping(false);
    };

    useEffect(() => {
        setMessagesAtom(messages.content);
        if (!socket) setSocket(io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`));
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.emit('join_room', room);
        socket.on('get_message', onGetMessageEvent);
        socket.on('typing', onTypingEvent);
        socket.on('stop_typing', onStopTypingEvent);
        return () => {
            socket.emit('leave_room', room);
            socket.disconnect();
            setSocket(null);
        };
    }, [socket]);

    return (
        <div className="flex flex-col-reverse py-2 gap-2 overflow-y-scroll">
            {isTyping && <TypingInfoCard users={typingUsers} />}
            <MessagesList room={room} messages={messages} />
        </div>
    );
};

export default RoomContent;
