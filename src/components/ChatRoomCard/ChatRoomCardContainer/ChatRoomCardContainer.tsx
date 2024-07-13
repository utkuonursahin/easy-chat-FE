'use client';
import React from 'react';
import {useToast} from "@/components/ui/use-toast";

export default function ChatRoomCardContainer({children}: {children: React.ReactNode}) {
    const {toast} = useToast();
    const onRoomClick = async (event:any) => {
        const copyButton: HTMLElement | null = (event.target as HTMLElement).closest('.copy-id');
        if(copyButton) {
            const id = copyButton?.dataset.roomId || '';
            await navigator.clipboard.writeText(id);
            toast({
                title: 'Copied to clipboard',
                description: `Room ID: ${id}`,
            })
        }
    };

    return (
        <ul onClick={onRoomClick} className="flex flex-col gap-4">
            {children}
        </ul>
    );
};