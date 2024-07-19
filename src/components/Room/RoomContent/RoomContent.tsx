'use client';
import React, {useEffect, useState} from 'react';
import {PaginatedMessageDto} from "@/dto/PaginatedMessageDto";
import {UserDto} from "@/dto/UserDto";
import {socket} from "@/socket";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import {useAtom} from "jotai";
import {messagesAtom} from "@/stores/stores";
import {MessageDto} from "@/dto/MessageDto";

type RoomContentProps = {
    room: ChatRoomDto
    messages: PaginatedMessageDto;
}

const RoomContent = ({room,messages}: RoomContentProps) => {
    const user = JSON.parse(window.localStorage.getItem('user')!) as UserDto;
    const [msgAtom, setMsgAtom] = useAtom(messagesAtom)

    useEffect(() => {
        socket.connect()
        socket.emit('join_room',room)
        setMsgAtom(messages.content)
        socket.on('get_message', (message: MessageDto) => {
            setMsgAtom((prev) => [message,...prev])
        })
        return () => {
            socket.emit('leave_room',room)
            socket.removeListener('get_message')
            socket.disconnect()
        }
    },[])

    return (
        <div className="flex flex-col-reverse gap-2 overflow-y-scroll">
            {msgAtom.map((message) => (
                <div key={message.id} className={`flex flex-col w-full gap-1 px-4 py-2 rounded-lg ${user.id === message.sender.id ? 'text-right bg-primary/30' : 'text-left bg-primary/10'}`}>
                    <p className="text-xs flex justify-between items-center">
                        <span className="text-primary">{user.id === message.sender.id ? 'Me' : message.sender.username}</span>
                        <span>{new Date(message.createdAt).toLocaleString('tr-TR')}</span>
                    </p>
                    <p className="text-secondary-foreground">{message.content}</p>
                </div>
            ))}
        </div>
    );
};

export default RoomContent;