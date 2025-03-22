import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Resume, ResumeState } from '../models/resume.model';

const initialState: ResumeState = {
    resumes: [],
    loading: false,
    error: null,
};
import { API_BASE_URL } from '../config';
// Async Thunks
export const fetchResumes = createAsyncThunk('resumes/fetchAll', async () => {
    const response = await axios.get<Resume[]>(`${API_BASE_URL}/resume`);
    return response.data;
});

export const fetchResumeById = createAsyncThunk('resumes/fetchById', async (id: string) => {
    const response = await axios.get<Resume>(`${API_BASE_URL}/resume/${id}`);
    return response.data;
});

export const addResume: any = createAsyncThunk(
    'resumes/add',
    async ({ userId, file, token }: { userId: number; file: File; token: string }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId.toString());

            const response = await axios.post<Resume>(`${API_BASE_URL}/Resume`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // הוספת ה-token לכותרות
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to upload resume');
        }
    }
);

export const updateResume = createAsyncThunk(`resumes/update`, async ({ id, resume }: { id: string; resume: Resume }) => {
    const response = await axios.put<Resume>(`${API_BASE_URL}/Resume/${id}`, resume);
    return response.data;
});

export const deleteResume = createAsyncThunk(`resumes/delete`, async (id: string) => {
    await axios.delete(`${API_BASE_URL}/Resume/${id}`);
    return id;
});

// Slice
const resumeSlice = createSlice({
    name: 'resumes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResumes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchResumes.fulfilled, (state, action: PayloadAction<Resume[]>) => {
                state.loading = false;
                state.resumes = action.payload;
            })
            .addCase(fetchResumes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch resumes';
            })
            .addCase(fetchResumeById.fulfilled, (state, action: PayloadAction<Resume>) => {
                state.resumes = state.resumes.map((resume) =>
                    resume.id === action.payload.id ? action.payload : resume
                );
            })
            .addCase(addResume.fulfilled, (state, action: PayloadAction<Resume>) => {
                // debugger
                state.resumes.push(action.payload);
            })
            .addCase(updateResume.fulfilled, (state, action: PayloadAction<Resume>) => {
                state.resumes = state.resumes.map((resume) =>
                    resume.id === action.payload.id ? action.payload : resume
                );
            })
            .addCase(deleteResume.fulfilled, (state, action: PayloadAction<string>) => {
                state.resumes = state.resumes.filter((resume) => resume.id !== action.payload);
            });
    },
});

export default resumeSlice.reducer;