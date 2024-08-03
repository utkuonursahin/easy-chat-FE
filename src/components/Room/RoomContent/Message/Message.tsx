import { forwardRef } from 'react';
import { MessageDto } from '@/dto/MessageDto';
import { useAtomValue } from 'jotai/index';
import { userAtom } from '@/stores/stores';

const messagesDateFormat = new Intl.DateTimeFormat('en-GB', {
    hourCycle: 'h24',
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
});

const Message = forwardRef(({ message }: { message: MessageDto }, ref: any) => {
    const user = useAtomValue(userAtom);
    return (
        <div
            ref={ref}
            className={`flex flex-col w-fit gap-1 px-4 py-2 rounded-md ${user.id === message?.sender.id ? 'text-right bg-primary/30 self-end' : 'text-left bg-primary/10'}`}
        >
            <p className="text-xs flex justify-between items-center gap-4">
                <span className="text-primary">
                    {user.id === message?.sender.id ? 'Me' : message?.sender.username}
                </span>
                <span>{message ? messagesDateFormat.format(new Date(message.createdAt)) : ''}</span>
            </p>
            <p className="text-secondary-foreground">{message?.content}</p>
        </div>
    );
});

export default Message;
