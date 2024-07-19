import {UUID} from "node:crypto";
import {UserDto} from "@/dto/UserDto";
import {ChatRoomDto} from "@/dto/ChatRoomDto";

export type MessageDto = {
    id: UUID;
    sender: UserDto;
    receiver: ChatRoomDto;
    content: string;
    createdAt: Date;
}