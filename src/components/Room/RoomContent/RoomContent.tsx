'use client';
import React, { useEffect, useState } from 'react';
import { PaginatedMessageDto } from '@/dto/PaginatedMessageDto';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import { useAtom, useSetAtom } from 'jotai';
import { messagesAtom, socketAtom } from '@/stores/stores';
import { MessageDto } from '@/dto/MessageDto';
import { io } from 'socket.io-client';
import { useInView } from 'react-intersection-observer';
import { useHttp } from '@/hooks/useHttp';
import { GenericResponse } from '@/dto/GenericResponse';
import MessagesList from '@/components/Room/RoomContent/MessagesList/MessagesList';
import { Loader } from 'lucide-react';
import { motion } from 'framer-motion';

type RoomContentProps = {
    room: ChatRoomDto;
    messages: PaginatedMessageDto;
};

const spinnerVariants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 1,
            ease: 'linear',
            repeat: Infinity
        }
    }
};

const RoomContent = ({ room, messages }: RoomContentProps) => {
    const setMessagesAtom = useSetAtom(messagesAtom);
    const [socket, setSocket] = useAtom(socketAtom);
    const { ref, inView, entry } = useInView({
        threshold: 1
    });
    const httpClient = useHttp();
    const [pageCounter, setPageCounter] = useState(1);

    const onGetMessageEvent = (message: MessageDto) => {
        setMessagesAtom((prev) => [message, ...prev]);
    };

    useEffect(() => {
        setMessagesAtom(messages.content);
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

    const fetchOldMessages = async () => {
        const {
            data: { content: oldMessages }
        }: GenericResponse<PaginatedMessageDto> = await httpClient.get(
            `http://localhost:8080/api/messages/receiver/${room.id}?page=${pageCounter}&size=10`
        );
        setMessagesAtom((prev) => [...prev, ...oldMessages]);
        setPageCounter((prev) => prev + 1);
    };

    useEffect(() => {
        if (inView && messages.totalPages > pageCounter) fetchOldMessages();
    }, [inView]);

    return (
        <div className="flex flex-col-reverse py-2 gap-2 overflow-y-scroll">
            <MessagesList />
            {messages.totalPages > pageCounter && (
                <div ref={ref} className="flex items-center justify-center">
                    <motion.div animate="animate" variants={spinnerVariants}>
                        <Loader />
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default RoomContent;
