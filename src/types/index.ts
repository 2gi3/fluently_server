import { Request } from "express";

export interface CustomRequest<T = any> extends Request {
    userId?: string | number;
    body: T
}