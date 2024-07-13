import ChatRoomCard from "@/components/ChatRoomCard/ChatRoomCard";
import ChatRoomCreateCard from "@/components/ChatRoomCard/ChatRoomCreateCard/ChatRoomCreateCard";
import {cookies} from "next/headers";
import {GenericResponse} from "@/dto/GenericResponse";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import {Toaster} from "@/components/ui/toaster";
import ChatRoomCardContainer from "@/components/ChatRoomCard/ChatRoomCardContainer/ChatRoomCardContainer";

async function getData(){
    const response = await fetch('http://localhost:8080/api/chat-rooms/join',{
        headers: {Cookie: cookies().toString()},
        cache: 'no-cache',credentials:'include'})
    return await response.json();
}

export default async function Page (){
    const {data} : GenericResponse<ChatRoomDto[]> = await getData();
    return (
        <div>
            <ul className="flex flex-col gap-4 p-4 h-[calc(100vh-4rem)] overflow-y-scroll">
                <li>
                    <ChatRoomCreateCard/>
                </li>
                <li>
                    <ChatRoomCardContainer>
                        {data.map((contact, index) =>
                            <li key={index}><ChatRoomCard index={index} data={contact}/></li>
                        )}
                    </ChatRoomCardContainer>
                </li>
            </ul>
            <Toaster/>
        </div>
    );
};