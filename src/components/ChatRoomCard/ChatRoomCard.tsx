'use client';
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {motion} from "framer-motion";
import {ChatRoomDto} from "@/dto/ChatRoomDto";

export default function ChatRoomCard({data, index}: {data: ChatRoomDto, index: number}) {
  return (
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
          transition={{ease: 'easeInOut', duration: 0.25, delay: 0.25 + index * 0.1}}
          className="col-span-full row-span-full grid-cols-subgrid grid-rows-subgrid grid"
      >
      <Card className="rounded flex flex-col gap-4 px-6 py-4">
          <CardHeader className="flex gap-2 justify-center p-0">
              <CardTitle className="font-thin p-0">{data.name}</CardTitle>
              <CardDescription className="text-primary p-0 !mt-0">#{data.id}</CardDescription>
          </CardHeader>
      </Card>
      </motion.div>
  );
}