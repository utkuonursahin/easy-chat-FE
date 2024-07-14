import MessageInput from "@/components/MessageInput/MessageInput";
import RoomHeader from "@/components/RoomHeader/RoomHeader";
import {cookies} from "next/headers";
import {GenericResponse} from "@/dto/GenericResponse";
import {ChatRoomDto} from "@/dto/ChatRoomDto";

async function getData(id: string): Promise<ChatRoomDto>{
    const response = await fetch(`http://localhost:8080/api/chat-rooms/${id}`,{
        headers: {Cookie: cookies().toString()},
        cache: 'no-cache',credentials:'include'})
    const {data,statusCode} : GenericResponse<ChatRoomDto> = await response.json();
    return statusCode === 200 ? data : {} as ChatRoomDto;
}

export default async function Page({ params }: { params: { roomId: string } }) {
    const roomInfo = await getData(params.roomId)
    return (
        <section className="grid grid-rows-[min-content,1fr,min-content] p-4">
            <RoomHeader data={roomInfo} />
            <div></div>
            <MessageInput />
        </section>
    )
}