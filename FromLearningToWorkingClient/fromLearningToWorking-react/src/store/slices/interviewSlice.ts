import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { InterviewState } from '../../models/interview.model';
import API from '../../services/axios.interceptor'; // Import the interceptor


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

export const getQuestionsByInterviewId: any = createAsyncThunk(
    'interview/getQuestionsByInterviewId',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await API.get(`/interviewQuestion/byInterview/${id}`);
            return response.data; // Return the list of questions
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch questions');
        }
    }
);

export const resultOfInterview: any = createAsyncThunk(
    'interview/resultOfInterview',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await API.get(`/Interview/resultOfInterview/${id}`);
            return response.data; // Return the result of the interview
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch interview result');
        }
    }
);

export const initialState: InterviewState = {
    IdInterview:1,
    questions: [],
    currentQuestionIndex: 0,
    mark: 0,
    feedback: null,
    summary: '', // Store the summary of the interview result
    status: 'idle',
    error: null,
    timeInterview: 0,
    result: [], // Add a field to store the ResultInterviewModel
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
                state.questions[state.currentQuestionIndex].feedback = action.payload.feedback; // Save feedback for the current question
            })
            .addCase(checkAnswer.rejected, (state, action) => {
                state.error = action.payload || 'Failed to check answer';
            })
            .addCase(createInterview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createInterview.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload.questions.map((q: string, index: number) => ({
                    id: index + 1, 
                    question: q,
                    answer: '', 
                    feedback: '', 
                    mark: 0, 
                    time: 0, 
                }));
                state.IdInterview=action.payload.id
            })
            .addCase(createInterview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to create interview';
            })
            .addCase(getQuestionsByInterviewId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getQuestionsByInterviewId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload; // Update the questions in the state
                console.log(state.questions);
                
            })
            .addCase(getQuestionsByInterviewId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch questions';
            })
            .addCase(resultOfInterview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(resultOfInterview.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mark = action.payload.mark;
                state.feedback = action.payload.feedback;
                state.timeInterview = action.payload.time;
                state.result = action.payload.result; // Update the result of the interview
            })
            .addCase(resultOfInterview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch interview result';
            })
    },
});

export const { resetInterview, nextQuestion, saveAnswer, saveFeedbackQuestion, saveFeedbackAndMark } = interviewSlice.actions;

export default interviewSlice.reducer;
