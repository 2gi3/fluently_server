import { Request } from "express";

export interface CustomRequest<T = any> extends Request {
    userId?: string | number;
    body: T
}

export interface AudioFileT {
    id: number;
    userId: number | string;
    audioUrl: string;
    duration: number;
    created_at: Date;
}

