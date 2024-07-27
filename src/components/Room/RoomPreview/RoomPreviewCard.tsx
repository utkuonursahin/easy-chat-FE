import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import {Copy} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function RoomPreviewCard({data}: {data: ChatRoomDto}) {
    return (
        <Card className="room-card rounded flex flex-col gap-4 px-6 py-4" data-room-id={data.id}>
            <CardHeader className="flex gap-2 justify-center p-0">
                <CardTitle className="font-thin p-0">{data.name}</CardTitle>
                <CardDescription className="copy-id text-primary !mt-0 w-fit">
                    <Button className="flex gap-1 text-xs px-2" variant={"outline"}>
                        <span className="text-xs">Copy Id</span>
                        <Copy className="h-[1.5cap]"/>
                    </Button>
                </CardDescription>
            </CardHeader>
        </Card>
  );
}