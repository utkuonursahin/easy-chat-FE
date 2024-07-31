import RoomCreateCard from '@/components/Room/RoomCreateCard/RoomCreateCard';
import { cookies } from 'next/headers';
import { GenericResponse } from '@/dto/GenericResponse';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import RoomPreview from '@/components/Room/RoomPreview/RoomPreview';
import { useHttp } from '@/hooks/useHttp';

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
        <div className="flex flex-col gap-4 p-4 h-[calc(100vh-4rem)] overflow-y-scroll">
            <RoomCreateCard />
            <RoomPreview chatRoomsData={chatRooms} />
        </div>
    );
}
