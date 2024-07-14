import React from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SendHorizontal} from "lucide-react";

const MessageInput = () => {
    return (
        <div className="flex gap-4 p-2 bg-primary/10 rounded-lg">
            <Input placeholder="Type a message" />
            <Button className="flex items-center justify-center">
                <SendHorizontal/>
            </Button>
        </div>
    );
};

export default MessageInput;