import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import {Copy} from "lucide-react";

export default function RoomCard({data}: {data: ChatRoomDto}) {
    return (
        <Card className="room-card rounded flex flex-col gap-4 px-6 py-4" data-room-id={data.id}>
            <CardHeader className="flex gap-2 justify-center p-0">
                <CardTitle className="font-thin p-0">{data.name}</CardTitle>
                <CardDescription className="copy-id text-primary !mt-0 w-fit">
                    <p className="flex items-center">
                        <span>#{data.id.substring(0,12).padEnd(25,'.')}</span>
                        <Copy className="h-[1.5cap]"/>
                    </p>
                </CardDescription>
            </CardHeader>
        </Card>
  );
}