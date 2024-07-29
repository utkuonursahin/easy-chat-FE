import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import {Copy, LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function RoomPreviewCard({data}: {data: ChatRoomDto}) {
    return (
        <Card className="room-card ring-1 ring-primary rounded flex flex-col gap-4 px-4 py-7" data-room-id={data.id}>
            <CardHeader className="flex flex-row gap-2 justify-between items-center p-0">
                <CardTitle className="font-light p-0">{data.name}</CardTitle>
                <CardDescription className="text-primary !mt-0 w-fit flex gap-2">
                    <Button className="copy-id px-2">
                        <Copy className="h-[1.5cap]"/>
                    </Button>
                    <Button className="leave-room px-2" variant={"outline"}>
                        <LogOut className="h-[1.5cap]"/>
                    </Button>
                </CardDescription>
            </CardHeader>
        </Card>
  );
}