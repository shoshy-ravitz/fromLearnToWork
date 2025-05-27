import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../services/axios.interceptor'; 


interface UserState {
   
    user: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
   
    user: null,
    loading: false,
    error: null,
};



export const fetchUserById :any= createAsyncThunk('user/fetchUserById', async (id: number, { rejectWithValue }) => {
    try {
        const response = await API.get(`/user/${id}`);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to fetch user');
    }
});


export const updateUser:any = createAsyncThunk(
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



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            // Update user
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export default userSlice.reducer;