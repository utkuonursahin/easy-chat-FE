'use client';
import React, {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {SendHorizontal} from 'lucide-react';
import {ChatRoomDto} from '@/dto/ChatRoomDto';
import {UserDto} from '@/dto/UserDto';
import {useAtomValue} from 'jotai';
import {socketAtom} from '@/stores/stores';

type RoomContentProps = {
    room: ChatRoomDto;
};

const RoomMessageInput = ({ room }: RoomContentProps) => {
    const user = JSON.parse(window.localStorage.getItem('user')!) as UserDto;
    const [textMsg, setTextMsg] = useState('');
    const [isWriting, setIsWriting] = useState(false);
    const socket = useAtomValue(socketAtom);

    const onClick = () => {
        const message = {
            sender: user,
            receiver: room,
            content: textMsg
        };
        socket?.emit('send_message', message);
        setTextMsg('');
    };

    return (
        <div className="flex gap-2">
            <Input
                value={textMsg}
                onChange={(e) => setTextMsg(e.target.value)}
                onFocus={() => setIsWriting((prev) => true)}
                onBlur={() => setIsWriting((prev) => false)}
                placeholder="Type a message"
            />
            <Button
                onClick={onClick}
                className={`flex items-center justify-center ${!isWriting ? 'opacity-50' : ''}`}
            >
                <SendHorizontal size={16} className="-rotate-45 " />
            </Button>
        </div>
    );
};

export default RoomMessageInput;
