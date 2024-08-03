import React, { useEffect, useState } from 'react';
import { messagesAtom } from '@/stores/stores';
import Message from '@/components/Room/RoomContent/Message/Message';
import { GenericResponse } from '@/dto/GenericResponse';
import { PaginatedMessageDto } from '@/dto/PaginatedMessageDto';
import { useInView } from 'react-intersection-observer';
import { useHttp } from '@/hooks/useHttp';
import { useAtom } from 'jotai';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import { MessageDto } from '@/dto/MessageDto';

type MessagesListProps = {
    room: ChatRoomDto;
    messages: PaginatedMessageDto;
};

const MessagesList = ({ room, messages }: MessagesListProps) => {
    const { ref, inView, entry } = useInView({
        threshold: 1
    });
    const httpClient = useHttp();
    const [pageCounter, setPageCounter] = useState(0);
    const [messagesAtomValue, setMessagesAtom] = useAtom(messagesAtom);

    const fetchOldMessages = async () => {
        const {
            data: { content: oldMessages }
        }: GenericResponse<PaginatedMessageDto> = await httpClient.get(
            `http://localhost:8080/api/messages/receiver/${room.id}?page=${pageCounter + 1}&size=10`
        );
        setMessagesAtom((prev) => [...prev, ...oldMessages]);
        setPageCounter((prev) => prev + 1);
    };

    useEffect(() => {
        if (inView && messages.totalPages > pageCounter) fetchOldMessages();
    }, [inView]);

    return (
        <>
            {messagesAtomValue.slice(0, -1).map((message) => (
                <Message key={message.id} message={message} />
            ))}
            <Message message={messagesAtomValue.at(-1) as MessageDto} ref={ref} />
        </>
    );
};

export default MessagesList;
