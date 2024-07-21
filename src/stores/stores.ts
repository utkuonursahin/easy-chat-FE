import {atom, PrimitiveAtom} from "jotai/index";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import {MessageDto} from "@/dto/MessageDto";

export const chatRoomsAtom = atom([] as ChatRoomDto[])
export const findRoomSearchAtom = atom('')
export const messagesAtom = atom([] as MessageDto[])
export const socketAtom: PrimitiveAtom<any> = atom( null);