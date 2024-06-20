'use client';
import {ContactData} from "@/dto/ContactData";
import ContactCard from "@/components/ContactCard/ContactCard";
import {motion} from "framer-motion";

const Page = () => {
    const data:ContactData[] = [
        {
            roomName: "Room 1",
            roomId: "1",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 2",
            roomId: "2",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 3",
            roomId: "3",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 4",
            roomId: "4",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 5",
            roomId: "5",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 6",
            roomId: "6",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 7",
            roomId: "7",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 8",
            roomId: "8",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 9",
            roomId: "9",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 10",
            roomId: "10",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 11",
            roomId: "11",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 12",
            roomId: "12",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 13",
            roomId: "13",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 14",
            roomId: "14",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 15",
            roomId: "15",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 16",
            roomId: "16",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        },
        {
            roomName: "Room 17",
            roomId: "17",
            lastReceivedMessageDate: new Date(),
            lastMessage: "Hello, how are you?"
        }
    ]
    return (
        <ul className="flex flex-col gap-4 p-4 h-[calc(100vh-4rem)] overflow-y-scroll">
            {data.map((contact, index) => {
                return <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{ease: 'easeInOut', duration: 0.25, delay: 0.25 + index * 0.1}}
                    className="col-span-full row-span-full grid-cols-subgrid grid-rows-subgrid grid"
                >
                    <ContactCard key={index} data={contact}/>
                </motion.div>
            })}
        </ul>
    );
};

export default Page;