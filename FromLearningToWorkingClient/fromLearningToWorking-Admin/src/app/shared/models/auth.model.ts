import { User } from "./user.model";

export interface AuthModel {
    email: string;
    password: string;
}

export interface AuthResponseModel {
    token: string;
    user: User;
}