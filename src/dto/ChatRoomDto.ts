import {UUID} from "node:crypto";
import {UserDto} from "@/dto/UserDto";

export type ChatRoomDto = {
    id: UUID,
    name: string,
    createdBy: UserDto,
    members: UserDto[],
}