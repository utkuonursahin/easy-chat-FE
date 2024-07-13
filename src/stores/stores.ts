import {atom} from "jotai/index";
import {ChatRoomDto} from "@/dto/ChatRoomDto";

export const chatRoomsAtom = atom([] as ChatRoomDto[])

export const findRoomSearchAtom = atom('')