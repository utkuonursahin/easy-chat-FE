import {UUID} from "node:crypto";
import {UserDto} from "@/dto/UserDto";
import {ChatRoomDto} from "@/dto/ChatRoomDto";

export type MessageDto = {
    id: UUID;
    sender: UserDto;
    receiver: ChatRoomDto;
    seenBy: UserDto[];
    content: string;
    createdAt: Date;
}