import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_PYTHON_BASE_URL } from '../config';
import { InterviewState } from '../models/interview.model';
import API from '../axios.interceptor'; // Import the interceptor

// Async thunk to check answer
export const checkAnswer: any = createAsyncThunk(
    'interview/checkAnswer',
    async ({  question, answer, time, interviewId }: { question: string; answer: string ,time:number,interviewId:number}, { rejectWithValue }) => {
        try {
            const response = await API.post('/InterviewQuestion/checkAnswer', {
                question,
                answer,
                time,
                interviewId,
            });
            return response.data.feedback; // Return the feedback from the API
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to check answer');
        }
    }
);

export const fetchInterviewFeedback: any = createAsyncThunk(
    'interview/fetchInterviewFeedback',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('/interview/resultOfInterview');
            return response.data.feedback; // Return the feedback from the API
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch interview feedback');
        }
    }
);

export const createInterview: any = createAsyncThunk(
    'interview/createInterview',
    async ({ userId, interviewLevel = 'mid' }: { userId: number; interviewLevel?: string }, { rejectWithValue }) => {
        try {
            
            const response = await API.get('/interview/createInterview', {
                params: { userId, interviewLevel },
            });
            return response.data; // Return the array of questions
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to create interview');
        }
    }
);

export const initialState: InterviewState = {
    questions: [],
    currentQuestionIndex: 0,
    mark: 0,
    feedback: null,
    summary: '',
    status: 'idle',
    error: null,
    timeInterview: 0,
}

const interviewSlice = createSlice({
    name: 'interview',
    initialState,
    reducers: {
        resetInterview: (state) => {
            state = initialState;
        },
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1; // Move to the next question
            }
        },
        saveAnswer: (state, action) => {
            state.questions[state.currentQuestionIndex].answer = action.payload.answer; // Save the answer for the current question
        },
        saveFeedbackQuestion: (state, action) => {
            state.questions[state.currentQuestionIndex].feedback = action.payload.feedback; // Save the feedback for the current question
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAnswer.fulfilled, (state, action) => {
                state.questions[state.currentQuestionIndex].feedback = action.payload; // Save feedback for the current question
            })
            .addCase(fetchInterviewFeedback.fulfilled, (state, action) => {
                state.feedback = action.payload; // Store the overall feedback in the state
            })
            .addCase(checkAnswer.rejected, (state, action) => {
                state.error = action.payload || 'Failed to check answer';
            })
            .addCase(fetchInterviewFeedback.rejected, (state, action) => {
                state.error = action.payload || 'Failed to fetch interview feedback';
            })
            .addCase(createInterview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createInterview.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Map the response into an array of Question objects
                state.questions = action.payload.map((q: string, index: number) => ({
                    id: index + 1, // Assign a unique ID to each question
                    question: q,
                    answer: '', // Initialize with an empty answer
                    feedback: '', // Initialize with empty feedback
                    mark: 0, // Initialize with a default mark
                    time: 0, // Initialize with default time
                }));
            })
            .addCase(createInterview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to create interview';
            });
    },
});

export const { resetInterview, nextQuestion, saveAnswer ,saveFeedbackQuestion} = interviewSlice.actions;

export default interviewSlice.reducer;
