'use client';
import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SendHorizontal} from "lucide-react";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import {PaginatedMessageDto} from "@/dto/PaginatedMessageDto";
import {UserDto} from "@/dto/UserDto";
import {MessageDto} from "@/dto/MessageDto";
import {socket} from "@/socket";
import {useSetAtom} from "jotai";
import {messagesAtom} from "@/stores/stores";

type RoomContentProps = {
    room: ChatRoomDto
    messages: PaginatedMessageDto;
}

const RoomInput = ({room,messages} : RoomContentProps) => {
    const user = JSON.parse(window.localStorage.getItem('user')!) as UserDto;
    const [textMsg, setTextMsg] = useState('')
    const setMsgAtom = useSetAtom(messagesAtom)

    const onClick = () => {
        const message = {
            sender: user,
            receiver: room,
            content: textMsg,
            createdAt: new Date()
        }
        setMsgAtom((prev) => [message as MessageDto,...prev])
        setTextMsg('')
        socket.emit('send_message',message)
    }

    return (
        <div className="flex gap-4 p-2 bg-primary/10 rounded-lg">
            <Input value={textMsg} onChange={(e) => setTextMsg(e.target.value)} placeholder="Type a message" />
            <Button onClick={onClick} className="flex items-center justify-center">
                <SendHorizontal/>
            </Button>
        </div>
    );
};

export default RoomInput;