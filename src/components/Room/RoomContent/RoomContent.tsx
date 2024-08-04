'use client';
import { useEffect } from 'react';
import { PaginatedMessageDto } from '@/dto/PaginatedMessageDto';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import { useAtom, useSetAtom } from 'jotai';
import { messagesAtom, socketAtom } from '@/stores/stores';
import { MessageDto } from '@/dto/MessageDto';
import { io } from 'socket.io-client';
import MessagesList from '@/components/Room/RoomContent/MessagesList/MessagesList';

type RoomContentProps = {
    room: ChatRoomDto;
    messages: PaginatedMessageDto;
};

const RoomContent = ({ room, messages }: RoomContentProps) => {
    const setMessagesAtom = useSetAtom(messagesAtom);
    const [socket, setSocket] = useAtom(socketAtom);

    const onGetMessageEvent = (message: MessageDto) => {
        setMessagesAtom((prev) => [message, ...prev]);
    };

    useEffect(() => {
        setMessagesAtom(messages.content);
        if (!socket) setSocket(io('ws://192.168.1.6:8085'));
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
            <MessagesList room={room} messages={messages} />
        </div>
    );
};

export default RoomContent;
