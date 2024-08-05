import RoomCreateCard from '@/components/Room/RoomCreateCard/RoomCreateCard';
import { cookies } from 'next/headers';
import { GenericResponse } from '@/dto/GenericResponse';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import RoomPreview from '@/components/Room/RoomPreview/RoomPreview';
import { useHttp } from '@/hooks/useHttp';
import React from 'react';

async function getData() {
    const httpClient = useHttp();
    const { data, statusCode }: GenericResponse<ChatRoomDto[]> = await httpClient
        .setHeaders({ Cookie: cookies().toString() })
        .get('http://localhost:8080/api/chat-rooms/join');
    return statusCode === 200 ? data : [];
}

export default async function Page() {
    const chatRooms = await getData();
    return (
        <section className="flex flex-col gap-4 p-4 h-[calc(100vh-4rem)] lg:h-full lg:col-start-3">
            <header>
                <h1 className="text-2xl font-semibold text-primary">Chat Rooms</h1>
            </header>
            <RoomCreateCard />
            <RoomPreview chatRoomsData={chatRooms} />
        </section>
    );
}
