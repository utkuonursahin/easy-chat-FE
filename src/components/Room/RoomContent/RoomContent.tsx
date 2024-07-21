'use client';
import React, {useEffect} from 'react';
import {PaginatedMessageDto} from "@/dto/PaginatedMessageDto";
import {UserDto} from "@/dto/UserDto";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import {useAtom} from "jotai";
import {messagesAtom, socketAtom} from "@/stores/stores";
import {MessageDto} from "@/dto/MessageDto";
import {io} from "socket.io-client";

type RoomContentProps = {
    room: ChatRoomDto
    messages: PaginatedMessageDto;
}

const RoomContent = ({room, messages}: RoomContentProps) => {
    const user = JSON.parse(window.localStorage.getItem('user')!) as UserDto;
    const [msgAtom, setMsgAtom] = useAtom(messagesAtom)
    const [socket, setSocket] = useAtom(socketAtom)
    useEffect(() => {
        let sc = null;
        if(!socket) {
            sc = io("ws://192.168.1.4:8085")
            setSocket(sc)
        }
        setMsgAtom(messages.content)
        sc?.emit('join_room',room)
        sc?.on('get_message', (message: MessageDto) => {
            setMsgAtom((prev) => [message,...prev])
        })
        return () => {
            sc?.emit('leave_room',room)
            sc?.off('get_message')
            sc?.disconnect()
            setSocket(null)
        }
    },[])

    return (
        <div className="flex flex-col-reverse py-2 gap-2 overflow-y-scroll">
            {msgAtom.map((message) => (
                <div key={message.id} className={`flex flex-col w-fit gap-1 px-4 py-2 rounded-lg ${user.id === message.sender.id ? 'text-right bg-primary/30 self-end' : 'text-left bg-primary/10'}`}>
                    <p className="text-xs flex justify-between items-center gap-4">
                        <span className="text-primary">{user.id === message.sender.id ? 'Me' : message.sender.username}</span>
                        <span>{new Date(message.createdAt).toLocaleString('en-GB',{
                            hourCycle: 'h24',
                            hour: 'numeric',
                            minute: 'numeric',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}</span>
                    </p>
                    <p className="text-secondary-foreground">{message.content}</p>
                </div>
            ))}
        </div>
    );
};

export default RoomContent;