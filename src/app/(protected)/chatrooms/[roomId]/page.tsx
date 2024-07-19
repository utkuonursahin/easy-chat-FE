import RoomHeader from "@/components/Room/RoomHeader/RoomHeader";
import {cookies} from "next/headers";
import {GenericResponse} from "@/dto/GenericResponse";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import Room from "@/components/Room/Room";
import React from "react";
import {PaginatedMessageDto} from "@/dto/PaginatedMessageDto";
import RoomContent from "@/components/Room/RoomContent/RoomContent";
import RoomInput from "@/components/Room/RoomInput/RoomInput";

type RoomData = {
    room: ChatRoomDto
    messages: PaginatedMessageDto
}

async function getData(id: string): Promise<RoomData>{
    const options = {
        method: 'GET',
        headers: {Cookie: cookies().toString()},
        cache: 'no-cache',
        credentials: 'include'
    }
    const roomResponse = await fetch(`http://localhost:8080/api/chat-rooms/${id}`,options)
    const roomData : GenericResponse<ChatRoomDto> = await roomResponse.json()
    const messagesResponse = await  fetch(`http://localhost:8080/api/messages/receiver/${id}?page=0&size=10`,options)
    const messagesData = await messagesResponse.json()
    if(roomData.statusCode === 200 && messagesData.statusCode === 200){
        return {room: roomData.data, messages: messagesData.data}
    }
}

export default async function Page({ params }: { params: { roomId: string } }) {
    const {room,messages}: RoomData = await getData(params.roomId)
    return (
        <section className="p-4">
            <Room roomData={room}>
                <RoomHeader>
                    <p className="capitalize">{room.name}</p>
                </RoomHeader>
                <RoomContent room={room} messages={messages}/>
                <RoomInput room={room} messages={messages}/>
            </Room>
        </section>
    )
}