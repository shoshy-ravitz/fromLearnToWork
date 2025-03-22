import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../config';
// Define the initial state
interface UserState {
    users: any[];
    user: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    user: null,
    loading: false,
    error: null,
};

// Async thunks for API calls
export const fetchUsers = createAsyncThunk('user/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id: number, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/${id}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to fetch user');
    }
});

export const createUser = createAsyncThunk('user/createUser', async (user: any, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user`, user);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to create user');
    }
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ id, user }: { id: number; user: any }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/user/${id}`, user);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to update user');
    }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (id: number, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_BASE_URL}/user/${id}`);
        return id;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to delete user');
    }
});

// Create the slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch users