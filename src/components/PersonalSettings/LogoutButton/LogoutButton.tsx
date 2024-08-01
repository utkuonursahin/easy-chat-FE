'use client';
import { Button } from '@/components/ui/button';
import { useHttp } from '@/hooks/useHttp';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSetAtom } from 'jotai';
import { userAtom } from '@/stores/stores';
import { RESET } from 'jotai/utils';

const LogoutButton = () => {
    const httpClient = useHttp();
    const router = useRouter();
    const setUserStorage = useSetAtom(userAtom);
    const handleClick = async () => {
        const { statusCode } = await httpClient.get('http://localhost:8080/api/auth/logout');
        if (statusCode === 200) {
            toast.success('Logged out successfully');
            setUserStorage(RESET);
            router.push('/login');
        }
    };
    return (
        <div>
            <Button onClick={handleClick} variant="outline" className="w-full">
                Logout
            </Button>
        </div>
    );
};

export default LogoutButton;
