import { atom, PrimitiveAtom } from 'jotai/index';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import { MessageDto } from '@/dto/MessageDto';
import { Socket } from 'socket.io-client';

export const chatRoomsAtom = atom([] as ChatRoomDto[]);
export const roomSearchInputAtom = atom('');
export const messagesAtom = atom([] as MessageDto[]);
export const socketAtom: PrimitiveAtom<Socket | null> = atom(null as Socket | null);
export const roomSearchResultAtom = atom(null as ChatRoomDto | null);
