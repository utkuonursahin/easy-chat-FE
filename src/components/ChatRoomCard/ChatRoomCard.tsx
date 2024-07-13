'use client';
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {motion} from "framer-motion";
import {ChatRoomDto} from "@/dto/ChatRoomDto";
import {Copy} from "lucide-react";

export default function ChatRoomCard({data, index}: {data: ChatRoomDto, index: number}) {
    return (
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
          transition={{ease: 'easeInOut', duration: 0.25, delay: 0.25 + index * 0.1}}
          className="col-span-full row-span-full grid-cols-subgrid grid-rows-subgrid grid"
      >
      <Card className="rounded flex flex-col gap-4 px-6 py-4">
          <CardHeader className="flex gap-2 justify-center p-0">
              <CardTitle className="font-thin p-0">{data.name}</CardTitle>
              <CardDescription data-room-id={data.id} className="copy-id text-primary p-0 !mt-0 flex items-center">
                  <p>
                      #{data.id.substring(0,12).padEnd(25,'.')}
                  </p>
                  <Copy className="h-[1.5cap]"/>
              </CardDescription>
          </CardHeader>
      </Card>
      </motion.div>
  );
}