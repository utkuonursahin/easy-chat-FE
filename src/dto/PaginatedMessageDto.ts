import { MessageDto } from '@/dto/MessageDto';

export type PaginatedMessageDto = {
    content: MessageDto[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
};
