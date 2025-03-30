import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../axios.interceptor'; // Import the interceptor

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
        const response = await API.get('/user');
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (id: number, { rejectWithValue }) => {
    try {
        const response = await API.get(`/user/${id}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to fetch user');
    }
});

export const createUser = createAsyncThunk('user/createUser', async (user: any, { rejectWithValue }) => {
    try {
        const response = await API.post('/user', user);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to create user');
    }
});

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ id, user }: { id: number; user: any }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/user/${id}`, user);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to update user');
        }
    }
);

export const deleteUser = createAsyncThunk('user/deleteUser', async (id: number, { rejectWithValue }) => {
    try {
        await API.delete(`/user/${id}`);
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
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch user by ID
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create user
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update user
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete user
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;