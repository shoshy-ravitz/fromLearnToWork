export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface RegisterModel {
    name: string;
    email: string;
    password: string;
}

export interface LoginModel {
    email: string;
    password: string;
}