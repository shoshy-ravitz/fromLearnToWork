import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios.interceptor';

// Async thunk to fetch all interviews by user ID
export const fetchUserInterviews:any = createAsyncThunk(
    'userInterviews/fetchUserInterviews',
    async (userId: number, { rejectWithValue }) => {
        try {
            const response = await API.get(`/interview/byUserId/${userId}`);
            return response.data; // Return the list of interviews
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch user interviews');
        }
    }
);

interface UserInterviewsState {
    interviews: Array<{
        id: number;
        mark: number;
        feedback: string;
        timeInterview: number;
    }>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserInterviewsState = {
    interviews: [],
    status: 'idle',
    error: null,
};

const userInterviewsSlice = createSlice({
    name: 'userInterviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInterviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserInterviews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.interviews = action.payload; // Update the interviews in the state
                console.log(state.interviews);
                
            })
            .addCase(fetchUserInterviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch user interviews';
            });
    },
});

export default userInterviewsSlice.reducer;