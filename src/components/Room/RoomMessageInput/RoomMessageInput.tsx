'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
import { ChatRoomDto } from '@/dto/ChatRoomDto';
import { useAtomValue } from 'jotai';
import { socketAtom, userAtom } from '@/stores/stores';

type RoomContentProps = {
    room: ChatRoomDto;
};

const RoomMessageInput = ({ room }: RoomContentProps) => {
    const user = useAtomValue(userAtom);
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
                onFocus={() => setIsWriting(() => true)}
                onBlur={() => setIsWriting(() => false)}
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
