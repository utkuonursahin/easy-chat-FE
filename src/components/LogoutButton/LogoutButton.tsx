'use client';
import { Button } from '@/components/ui/button';
import { useHttp } from '@/hooks/useHttp';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/stores/stores';
import { RESET } from 'jotai/utils';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';

const LogoutButton = () => {
    const httpClient = useHttp();
    const router = useRouter();
    const setUserStorage = useSetAtom(userAtom);
    const handleClick = async () => {
        const { statusCode } = await httpClient.get('http://localhost:8080/api/auth/logout');
        if (statusCode === 200) {
            toast.warning('You are logged out!');
            setUserStorage(RESET);
            router.push('/login');
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    Logout
                </Button>
            </DialogTrigger>
            <DialogContent className="grid grid-cols-2 w-5/6 rounded sm:max-w-[425px]">
                <DialogHeader className="col-span-full flex flex-col gap-2">
                    <DialogTitle className="text-xl text-primary">Logout Confirm</DialogTitle>
                    <DialogDescription>You are logging out. Are you sure?</DialogDescription>
                </DialogHeader>
                <DialogClose asChild>
                    <Button variant="outline" className="w-full">
                        Go Back
                    </Button>
                </DialogClose>
                <Button onClick={handleClick}>Logout</Button>
            </DialogContent>
        </Dialog>
    );
};

export default LogoutButton;
