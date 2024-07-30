'use client';
import React, { useEffect } from 'react';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import RoomPreviewCard from '@/components/Room/RoomPreview/RoomPreviewCard';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { chatRoomsAtom } from '@/stores/stores';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useHttp } from '@/hooks/useHttp';

type ChatRoomCardContainerProps = {
    chatRoomsData: ChatRoomDto[];
};

export default function RoomPreviewContainer({ chatRoomsData }: ChatRoomCardContainerProps) {
    const router = useRouter();
    const httpClient = useHttp();
    const [chatRooms, setChatRooms] = useAtom(chatRoomsAtom);

    useEffect(() => {
        setChatRooms(chatRoomsData);
    }, []);

    const onRoomClick = async (event: any) => {
        const id = ((event.target as HTMLElement).closest('.room-card') as HTMLElement)?.dataset.roomId || '';
        const shouldCopy = (event.target as HTMLElement).closest('.copy-id');
        const shouldLeave = (event.target as HTMLElement).closest('.leave-room');
        if (shouldCopy) {
            await navigator.clipboard.writeText(id);
            toast.success('Copied to clipboard', { description: `Room ID: ${id}` });
        } else if (shouldLeave) {
            try {
                await httpClient.del(`http://localhost:8080/api/chat-rooms/leave/${id}`);
                setChatRooms((prev) => prev.filter((room) => room.id !== id));
                toast.success('Left room', { description: `Room ID: ${id}` });
            } catch (e: any) {
                toast.error('Failed to leave room', { description: e.message });
            }
        } else router.push(`/chatrooms/${id}`);
    };

    return (
        <ul onClick={onRoomClick} className="flex flex-col gap-4">
            {chatRooms.map((room, index) => (
                <li key={index}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ ease: 'easeInOut', duration: 0.25, delay: 0.25 + index * 0.1 }}
                        className="col-span-full row-span-full grid-cols-subgrid grid-rows-subgrid grid"
                    >
                        <RoomPreviewCard data={room} />
                    </motion.div>
                </li>
            ))}
        </ul>
    );
}
