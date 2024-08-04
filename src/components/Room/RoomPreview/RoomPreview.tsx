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
import { ScrollArea } from '@/components/ui/scroll-area';

type ChatRoomCardContainerProps = {
    chatRoomsData: ChatRoomDto[];
};

export default function RoomPreview({ chatRoomsData }: ChatRoomCardContainerProps) {
    const router = useRouter();
    const httpClient = useHttp();
    const [chatRooms, setChatRooms] = useAtom(chatRoomsAtom);

    useEffect(() => {
        setChatRooms(chatRoomsData);
    }, [chatRoomsData]);

    const onRoomClick = async (event: any) => {
        const target = event.target as HTMLElement;
        const id = (target.closest('.room-card') as HTMLElement)?.dataset.roomId || '';
        if (target.closest('.copy-id')) {
            await navigator.clipboard.writeText(id);
            toast.success('Room id copied to clipboard!', { description: id });
        } else if (target.closest('.leave-room')) {
            try {
                await httpClient.del(`http://localhost:8080/api/chat-rooms/leave/${id}`);
                setChatRooms((prev) => prev.filter((room) => room.id !== id));
                toast.info('Leaved the room!', { description: `Room ID: ${id}` });
            } catch (e: any) {
                toast.error('Failed to leave room!', { description: e.message });
            }
        } else router.push(`/chatrooms/${id}`);
    };

    return (
        <ScrollArea>
            <ul onClick={onRoomClick} className="flex flex-col gap-2">
                {chatRooms.map((room, index) => (
                    <li key={room.id}>
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
        </ScrollArea>
    );
}
