export interface ChatroomT {
    id?: number;
    user1Id: number;
    user2Id: number;
    last_message_id?: number;
}

export type MessageT = {
    id?: string | number;
    chatId: string | number;
    userId: string | number;
    text: string;
    status: string;
    created_at?: string | Date;
    type?: 'text' | 'audio' | 'image' | null
    audioUrl?: string | null,
    audioDuration?: number | null
    imageUrl?: string | null

};