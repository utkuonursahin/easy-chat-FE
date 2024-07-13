import RoomCreateCard from "@/components/RoomCard/RoomCreateCard/RoomCreateCard";
import {cookies} from "next/headers";
import {GenericResponse} from "@/dto/GenericResponse";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import RoomCardContainer from "@/components/RoomCard/RoomCardContainer/RoomCardContainer";

async function getData(){
    const response = await fetch('http://localhost:8080/api/chat-rooms/join',{
        headers: {Cookie: cookies().toString()},
        cache: 'no-cache',credentials:'include'})
    const {data,statusCode} : GenericResponse<ChatRoomDto[]> = await response.json();
    return statusCode === 200 ? data : [];
}

export default async function Page (){
    const chatRooms = await getData();
    return (
        <div>
            <ul className="flex flex-col gap-4 p-4 h-[calc(100vh-4rem)] overflow-y-scroll">
                <li>
                    <RoomCreateCard/>
                </li>
                <li>
                    <RoomCardContainer chatRooms={chatRooms}/>
                </li>
            </ul>
        </div>
    );
};