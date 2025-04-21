import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_PYTHON_BASE_URL } from '../config';
import { InterviewState } from '../models/interview.model';
import API from '../axios.interceptor'; // Import the interceptor

// Async thunk to check answer
export const checkAnswer: any = createAsyncThunk(
    'interview/checkAnswer',
    async ({ question, answer, time, interviewId }: { question: string; answer: string, time: number, interviewId: number }, { rejectWithValue }) => {
        try {
            const response = await API.post('/InterviewQuestion/checkAnswer', {
                question,
                answer,
                time,
                interviewId,
            });
            return response.data; // Return the feedback from the API
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to check answer');
        }
    }
);

export const resultOfInterview: any = createAsyncThunk(
    'interview/resultOfInterview',
    async ({ feedbackList }: { feedbackList: string[] }, { rejectWithValue }) => {
        try {
            const response = await API.post('/result_of_interview', {
                feedback_list: feedbackList, // Send the list of feedback strings
            });
            return response.data.result; // Return the result from the API
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch interview result');
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
        saveFeedbackAndMark: (state, action) => {
            const { feedback, mark } = action.payload;
            const currentQuestion = state.questions[state.currentQuestionIndex];
            if (currentQuestion) {
                currentQuestion.feedback = feedback;
                currentQuestion.mark = mark;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAnswer.fulfilled, (state, action) => {
                state.questions[state.currentQuestionIndex].feedback = action.payload; // Save feedback for the current question
            })
            .addCase(resultOfInterview.fulfilled, (state, action) => {
                state.feedback = action.payload; // Store the result summary in the state
            })
            .addCase(resultOfInterview.rejected, (state, action) => {
                state.error = action.payload || 'Failed to fetch interview result';
            })
            .addCase(checkAnswer.rejected, (state, action) => {
                state.error = action.payload || 'Failed to check answer';
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

export const { resetInterview, nextQuestion, saveAnswer, saveFeedbackQuestion, saveFeedbackAndMark } = interviewSlice.actions;

export default interviewSlice.reducer;
