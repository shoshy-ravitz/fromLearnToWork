import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Resume, ResumeState } from '../../models/resume.model';
import API from '../../services/axios.interceptor';

const initialState: ResumeState = {
    resumes: [],
    loading: false,
    error: null,
};

// Async Thunks
export const fetchResumes: any = createAsyncThunk('resumes/fetchAll', async () => {
    const response = await API.get<Resume[]>('/resume');
    return response.data;
});

export const fetchResumeById = createAsyncThunk('resumes/fetchById', async (id: string) => {
    const response = await API.get<Resume>(`/resume/${id}`);
    return response.data;
});

export const addResume: any = createAsyncThunk(
    'resumes/add',
    async ({ userId, file }: { userId: number; file: File }, { rejectWithValue }) => {
        try {
            // Step 1: Get a presigned URL from the server
            const presignedUrlResponse = await API.post<{ url: string }>('/resume/presigned-url', { userId });
            const presignedUrl = presignedUrlResponse.data.url;

            // Step 2: Upload the file to the presigned URL
            await API.put(presignedUrl, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });

            // Step 3: Optionally, save the resume metadata in the database
            const resumeData = { userId, fileName: file.name }; // Adjust as necessary
            const response = await API.post<Resume>('/resume', resumeData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to upload resume');
        }
    }
);

export const updateResume: any = createAsyncThunk(
    'resumes/update',
    async ({ id, resume }: { id: string; resume: Resume }) => {
        const response = await API.put<Resume>(`/resume/${id}`, resume);
        return response.data;
    }
);

export const deleteResume = createAsyncThunk('resumes/delete', async (id: string) => {
    await API.delete(`/resume/${id}`);
    return id;
});

// New Thunk: Download Resume
export const downloadResume: any = createAsyncThunk(
    'resumes/download',
    async (userId: number, { rejectWithValue }) => {
        try {
            // Step 1: Request the presigned URL from the server
            const response = await API.get<{ url: string }>(`/resume/download/${userId}`);
            const presignedUrl = response.data.url;

            // Step 2: Return the presigned URL for the client to use
            return presignedUrl;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to download resume');
        }
    }
);

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
                state.resumes.push(action.payload);
            })
            .addCase(updateResume.fulfilled, (state, action: PayloadAction<Resume>) => {
                state.resumes = state.resumes.map((resume) =>
                    resume.id === action.payload.id ? action.payload : resume
                );
            })
            .addCase(deleteResume.fulfilled, (state, action: PayloadAction<string>) => {
                state.resumes = state.resumes.filter((resume) => resume.id !== action.payload);
            })
            .addCase(downloadResume.fulfilled, (state, action: PayloadAction<string>) => {
                // No state update needed; the presigned URL is returned directly
            });
    },
});

export default resumeSlice.reducer;