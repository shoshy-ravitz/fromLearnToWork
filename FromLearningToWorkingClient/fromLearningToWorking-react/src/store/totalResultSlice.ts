import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../axios.interceptor';
import { TotalResultInterviewDTO } from '../models/totalResultInterview.model';

// Define the initial state
interface TotalResultState {
    results: TotalResultInterviewDTO[];
    loading: boolean;
    error: string | null;
}

const initialState: TotalResultState = {
    results: [],
    loading: false,
    error: null,
};

// Async thunk to fetch total results by interview ID
export const fetchTotalResultsByInterviewId :any= createAsyncThunk(
    'totalResult/fetchByInterviewId',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await API.get(`/TotalResultInterview/byInterview/${id}`);
            return response.data; // Return the list of total results
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch total results');
        }
    }
);

// Create the slice
const totalResultSlice = createSlice({
    name: 'totalResult',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTotalResultsByInterviewId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTotalResultsByInterviewId.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload; // Update the results in the state
            })
            .addCase(fetchTotalResultsByInterviewId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default totalResultSlice.reducer;