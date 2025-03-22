export interface User {
    id: string;
    name: string;
    email: string;
    password: string; // Added password field
}
export interface UsersState {
    users: User[];
}

export const initialState: UsersState = {
    users: [],
};