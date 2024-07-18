'use client';
import React from 'react';
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import RoomPreviewCard from "@/components/Room/RoomPreview/RoomPreviewCard";
import {toast} from "sonner";
import {useSetAtom} from "jotai";
import { chatRoomsAtom } from '@/stores/stores';
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";

type ChatRoomCardContainerProps = {
    chatRooms: ChatRoomDto[];
}

export default function RoomPreviewContainer({chatRooms}: ChatRoomCardContainerProps) {
    const setChatRooms = useSetAtom(chatRoomsAtom)
    setChatRooms(chatRooms)
    const router = useRouter();
    const onRoomClick = async (event:any) => {
        const id = ((event.target as HTMLElement).closest('.room-card') as HTMLElement)?.dataset.roomId || '';
        const shouldCopy = (event.target as HTMLElement).closest('.copy-id')
        if(shouldCopy) {
            await navigator.clipboard.writeText(id);
            toast.success('Copied to clipboard', {description: `Room ID: ${id}`})
        } else router.push(`/chatrooms/${id}`);
    };

    return (
        <ul onClick={onRoomClick} className="flex flex-col gap-4">
            {chatRooms.map((room, index) =>
                <li key={index}>
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                transition={{ease: 'easeInOut', duration: 0.25, delay: 0.25 + index * 0.1}}
                                className="col-span-full row-span-full grid-cols-subgrid grid-rows-subgrid grid"
                    >
                        <RoomPreviewCard data={room}/>
                    </motion.div>
                </li>
                )}
        </ul>
    );
};