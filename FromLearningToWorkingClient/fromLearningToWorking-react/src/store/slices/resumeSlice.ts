import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Resume, ResumeState } from '../../models/resume.model';
import API from '../../services/axios.interceptor';
import axios from 'axios';


const initialState: ResumeState = {
    resume: {
        id: '',
        fileName: '',
        filePath: '',
        UploadDate: new Date(0), 
        userID: '',
    }, 
    loading: false,
    error: null,
};


export const fetchResumeByUserId :any= createAsyncThunk(
    'resumes/fetchByUserId',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await API.get<Resume>(`/resume/user/${userId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch resume');
        }
    }
);

export const addResume: any = createAsyncThunk(
    'resumes/add',
    async ({ userId, file }: { userId: number; file: File }, { rejectWithValue }) => {
        try {

            const formData = new FormData();
            formData.append('fileName', file.name);


            const presignedUrlResponse = await API.post<{ uploadUrl: string }>('/resume/upload-url', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const presignedUrl = presignedUrlResponse.data.uploadUrl;

            if (!presignedUrl) {
                return rejectWithValue('No presigned URL found for the resume upload');
            }
            await axios.put(presignedUrl, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });

            const resumeData = {
                userId: userId,
                fileName: file.name,
            };

            const response = await API.post('/resume', resumeData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to upload resume');
        }
    }
);

export const updateResumeWithPresignedUrl : any = createAsyncThunk(
    'resumes/updateWithPresignedUrl',
    async ({ userId, file }: { userId: number; file: File }, { rejectWithValue }) => {
        try {
            
            // Step 1: Request a presigned URL from the server
            const presignedUrlResponse = await API.post<{ uploadUrl: string }>(
                '/resume/upload-url',
                new URLSearchParams({ fileName: file.name })
            );

            const presignedUrl = presignedUrlResponse.data.uploadUrl;

            // Step 2: Upload the file to the presigned URL
            await axios.put(presignedUrl, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });
            console.log(file.name);
            console.log(typeof file.name);
            
            
            // Step 3: Notify the server to update the resume metadata
            // const response = await API.put(`/resume/update/${userId}`, JSON.parse( file.name ));
            

            // return response.data; // Return the updated resume
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to update resume');
        }
    }
);

export const downloadResume: any = createAsyncThunk(
    'resumes/download',
    async (userId: number, { rejectWithValue }) => {
        try {

            const response = await API.get<{ url: string }>(`/resume/download/${userId}`);
            const presignedUrl = response.data.url;

            if (!presignedUrl) {
                return rejectWithValue('No presigned URL found for the resume');
            }
            return presignedUrl;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to download resume');
        }
    }
);

export const deleteResume: any = createAsyncThunk(
    'resumes/delete',
    async (resumeId: string, { rejectWithValue }) => {
        try {
            const response = await API.delete(`/resume/${resumeId}`);
            return response.data; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to delete resume');
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
        .addCase(fetchResumeByUserId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchResumeByUserId.fulfilled, (state, action: PayloadAction<Resume>) => {
            state.loading = false;
            state.resume = action.payload; // Set the single resume object
        })
        .addCase(fetchResumeByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to fetch resume';
        })
        .addCase(updateResumeWithPresignedUrl.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateResumeWithPresignedUrl.fulfilled, (state, action: PayloadAction<Resume>) => {
            state.loading = false;
            state.resume = action.payload; // Update the single resume object
        })
        .addCase(updateResumeWithPresignedUrl.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to update resume';
        })
        .addCase(downloadResume.fulfilled, (state, action: PayloadAction<string>) => {
                // No state update needed; the presigned URL is returned directly
        })
        .addCase(deleteResume.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteResume.fulfilled, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.resume = {
                id: '',
                fileName: '',
                filePath: '',
                UploadDate: new Date(0), 
                userID: '',
            }; 
        })
        .addCase(deleteResume.rejected, (state, action) => {    
            state.loading = false;
            state.error = action.payload || 'Failed to delete resume';
        })
        .addCase(addResume.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addResume.fulfilled, (state, action: PayloadAction<Resume>) => {
            state.loading = false;
            state.resume = action.payload;
        })
        .addCase(addResume.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to add resume';
        });
    },
});

export default resumeSlice.reducer;