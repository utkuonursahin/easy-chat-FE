import { Role } from '@/enum/Role';
import { UUID } from 'node:crypto';

export type UserDto = {
    id: UUID;
    username: string;
    email: string;
    authorities: Role[];
};
