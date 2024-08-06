'use client';
import React from 'react';
import { useAtom } from 'jotai';
import { roomSearchInputAtom, roomSearchResultAtom } from '@/stores/stores';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useHttp } from '@/hooks/useHttp';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import { toast } from 'sonner';

const RoomSearchResult = () => {
    const [roomSearchResult, setRoomSearchResult] = useAtom(roomSearchResultAtom);
    const [roomSearchId, setRoomSearchId] = useAtom(roomSearchInputAtom);
    const httpClient = useHttp();

    const onJoinRoom = async () => {
        try {
            const { data: chatRoom, statusCode } = await httpClient.post<ChatRoomDto>(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat-rooms/join/${roomSearchId}`
            );

            switch (statusCode) {
                case 200:
                    toast.success(`Joined room: ${chatRoom.name}`);
                    break;
                case 409:
                    toast.error(`Already joined in room: ${roomSearchResult?.name}`);
                    break;
                default:
                    toast.error('Failed to join room');
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setRoomSearchId('');
            setRoomSearchResult(null);
        }
    };

    return (
        roomSearchResult && (
            <div className="ring-1 ring-primary rounded-md px-4 py-6 w-full flex items-center justify-between">
                <p className="flex flex-col">
                    <span className="text-sm">Room Name:</span>
                    <span className="text-lg">{roomSearchResult?.name}</span>
                </p>
                <Button onClick={onJoinRoom} className="flex items-center">
                    <span className="text-sm">Join</span>
                    <LogIn className="h-[1.5cap]" />
                </Button>
            </div>
        )
    );
};

export default RoomSearchResult;
