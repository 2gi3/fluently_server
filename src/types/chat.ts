export interface ChatroomT {
    id?: number;
    user1Id: number;
    user2Id: number;
    last_message_id?: number;
}

export type MessageT = {
    id?: string;
    chatId: string | number
    userId: number | string
    text: string;
    status: string
    createdAt?: string;
};