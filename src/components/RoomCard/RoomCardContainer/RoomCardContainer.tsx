'use client';
import React from 'react';
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import RoomCard from "@/components/RoomCard/RoomCard";
import {toast} from "sonner";
import {useSetAtom} from "jotai";
import { chatRoomsAtom } from '@/stores/stores';
import {useRouter} from "next/navigation";
import {motion} from "framer-motion";

type ChatRoomCardContainerProps = {
    chatRooms: ChatRoomDto[];
}

export default function RoomCardContainer({chatRooms}: ChatRoomCardContainerProps) {
    const setChatRooms = useSetAtom(chatRoomsAtom)
    setChatRooms(chatRooms)
    const router = useRouter();
    const onRoomClick = async (event:any) => {
        let target: HTMLElement | null = (event.target as HTMLElement).closest('.copy-id');
        if(target) {
            const id = target?.dataset.roomId || '';
            await navigator.clipboard.writeText(id);
            toast.success('Copied to clipboard', {description: `Room ID: ${id}`})
            return;
        }
        target = (event.target as HTMLElement).closest('.room-card');
        if(target) {
            const roomName = target?.dataset.roomName || '';
            router.push(`/chatrooms/${roomName.toLowerCase().replaceAll(' ','_')}`);
        }
    };

    return (
        <ul onClick={onRoomClick} className="flex flex-col gap-4">
            {chatRooms.map((room, index) =>
                <li key={index}>
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
                                transition={{ease: 'easeInOut', duration: 0.25, delay: 0.25 + index * 0.1}}
                                className="col-span-full row-span-full grid-cols-subgrid grid-rows-subgrid grid"
                    >
                        <RoomCard data={room}/>
                    </motion.div>
                </li>
                )}
        </ul>
    );
};