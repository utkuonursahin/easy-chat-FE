import RoomHeader from '@/components/Room/RoomHeader/RoomHeader';
import { cookies } from 'next/headers';
import { GenericResponse } from '@/dto/GenericResponse';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import Room from '@/components/Room/Room';
import { PaginatedMessageDto } from '@/dto/PaginatedMessageDto';
import RoomContent from '@/components/Room/RoomContent/RoomContent';
import RoomMessageInput from '@/components/Room/RoomMessageInput/RoomMessageInput';
import { useHttp } from '@/hooks/useHttp';

type RoomData = {
    room: ChatRoomDto;
    messages: PaginatedMessageDto;
};

async function getData(id: string): Promise<RoomData> {
    const httpClient = useHttp();
    const { data: room }: GenericResponse<ChatRoomDto> = await httpClient
        .setHeaders({ Cookie: cookies().toString() })
        .get(`http://localhost:8080/api/chat-rooms/${id}`);

    const { data: messages }: GenericResponse<PaginatedMessageDto> = await httpClient
        .setHeaders({ Cookie: cookies().toString() })
        .get(`http://localhost:8080/api/messages/receiver/${id}?page=0&size=10`);

    return { room, messages };
}

export default async function Page({ params }: { params: { roomId: string } }) {
    const { room, messages }: RoomData = await getData(params.roomId);
    return (
        <section className="lg:col-start-3 lg:h-screen">
            <Room>
                <RoomHeader>
                    <p className="normal-case">{room.name}</p>
                </RoomHeader>
                <RoomContent room={room} messages={messages} />
                <RoomMessageInput room={room} />
            </Room>
        </section>
    );
}
