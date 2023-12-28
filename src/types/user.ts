import { PostT } from "./community.js";

export interface NewUserT {
    email: string;
    password: string;
    name: string;
    nationality: string;
    country: string;
    native_language: string;
    teaching_language: string;
    learning_language: string;
}

export interface UserT extends NewUserT {
    id: number;
    age?: number | null;
    image?: string | null;
    description?: string | null;
    gender?: Gender | null;
    banned?: boolean | null;
    status?: string;
    posts?: PostT[]
    savedPosts?: number[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}
