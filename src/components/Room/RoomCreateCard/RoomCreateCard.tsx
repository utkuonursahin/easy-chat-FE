'use client';
import React, {useState} from 'react';
import {GenericResponse} from "@/dto/GenericResponse";
import {Card, CardContent} from "@/components/ui/card";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {CirclePlus} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const RoomCreateCard = () => {
    const [roomName, setRoomName] = useState('Cosy chat room');
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const onSubmit = async () => {
        const rawResponse = await fetch('http://localhost:8080/api/chat-rooms', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: roomName}),
            credentials: 'include', cache: 'no-cache'});
        const {statusCode,data : {name}} : GenericResponse<ChatRoomDto> = await rawResponse.json();
        if(statusCode === 201) {
            setOpen(prevState => !prevState);
            toast.success('Room created successfully',{description: `Room Name: ${name}`});
            router.refresh();
        }
    }
    return (
        <Card className="bg-primary/10 ring-1 ring-secondary-background rounded px-6 py-4 hover:ring-2 hover:ring-bg-primary transition-all duration-300">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <CardContent className="hover:cursor-pointer p-0 flex flex-col items-center justify-center gap-2">
                        <CirclePlus size={28} color="#2863eb"/>
                        <p className="text-sm capitalize">Create new room</p>
                    </CardContent>
                </DialogTrigger>
                <DialogContent className="w-5/6 rounded sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="font-thin">Create Room</DialogTitle>
                        <DialogDescription>
                            Create a new room to start chatting with your friends.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Room Name">
                                Room Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue={roomName}
                                className="col-span-3"
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex flex-row gap-4">
                        <Button onClick={onSubmit} type="submit" className="flex-1">Submit</Button>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default RoomCreateCard;