import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_PYTHON_BASE_URL } from '../config';
import { InterviewState } from '../models/interview.model';
import { API_BASE_URL } from '../config';

// Async thunk to upload resume and fetch questions
// export const uploadResume: any = createAsyncThunk(
//     'interview/uploadResume',
//     async (resumeFile: File) => {
//         const formData = new FormData();
//         formData.append('resume', resumeFile);
//         const response = await axios.post(`${API_PYTHON_BASE_URL}/upload_resume`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         const arrayQuestions = parseQuestions(response.data.questions);
//         console.log(arrayQuestions);

//         return arrayQuestions; // מחזירים את השאלות
//     }
// );

// function parseQuestions(questionsString) {
//     // המרת המחרוזת לאובייקט JSON
//     const parsedQuestions = JSON.parse(questionsString);

//     // ניקוי השאלות ממרחבים נוספים
//     const questions = parsedQuestions.map(question => question.trim());

//     // יצירת אובייקט שמכיל את השאלות
//     return questions;
// }
// Async thunk to check answer


export const checkAnswer: any = createAsyncThunk(
    'interview/checkAnswer',
    async ({ question, answer }: { question: string; answer: string }) => {
        const response = await axios.post(`${API_PYTHON_BASE_URL}/check_answer`, {
            question,
            answer,
        });
        return response.data.feedback; // מחזירים את הפידבק
    }
);


export const fetchInterviewFeedback: any = createAsyncThunk(
    'interview/fetchInterviewFeedback',
    async () => {
        const response = await axios.get(`${API_PYTHON_BASE_URL}/interview_feedback`);
        return response.data.feedback; // Return the feedback from the API
    }
);

export const createInterview: any = createAsyncThunk(
    'interview/createInterview',
    async ({ userId, interviewLevel = 'mid', token }: { userId: number; interviewLevel?: string; token: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/createInterview`, {
                params: { userId, interviewLevel },
                headers: {
                    Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                },
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
            state=initialState
        },
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1; // עובר לשאלה הבאה
            }
        },
        saveAnswer: (state, action) => {
            state.questions[state.currentQuestionIndex].answer = action.payload.answer; // שומר את התשובה בשאלה הנוכחית
        },
        saveFeedbackQuestion: (state, action) => {
            state.questions[state.currentQuestionIndex].feedback = action.payload.feedback; // שומר את הפידבק בשאלה הנוכחית
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAnswer.fulfilled, (state, action) => {
                state.questions[state.currentQuestionIndex].feedback=action.payload;
            })
            .addCase(fetchInterviewFeedback.fulfilled, (state, action) => {
                state.feedback = action.payload; // Store the feedback in the state
            })
            .addCase(createInterview.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createInterview.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload; // Save the questions in the state
            })
            .addCase(createInterview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to create interview';
            });
    },
});

export const { resetInterview, nextQuestion, saveAnswer } = interviewSlice.actions;

export default interviewSlice.reducer;
