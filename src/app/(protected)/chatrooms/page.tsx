import ChatRoomCard from "@/components/ChatRoomCard/ChatRoomCard";
import ChatRoomCreateCard from "@/components/ChatRoomCard/ChatRoomCreateCard/ChatRoomCreateCard";
import {cookies} from "next/headers";
import {GenericResponse} from "@/dto/GenericResponse";
import {ChatRoomDto} from "@/dto/ChatRoomDto";

async function getData(){
    const response = await fetch('http://localhost:8080/api/chat-rooms/joined',{
        headers: {Cookie: cookies().toString()},
        cache: 'no-cache',credentials:'include'})
    const {data}: GenericResponse<ChatRoomDto[]> = await response.json();
    return data;
}

export default async function Page (){
    const data:ChatRoomDto[] = await getData();
    return (
        <ul className="flex flex-col gap-4 p-4 h-[calc(100vh-4rem)] overflow-y-scroll">
            <ChatRoomCreateCard/>
            {data.map((contact, index) => {
                return <ChatRoomCard key={index} index={index} data={contact}/>
            })}
        </ul>
    );
};