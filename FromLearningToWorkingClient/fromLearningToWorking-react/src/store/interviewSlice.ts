import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_PYTHON_BASE_URL } from '../config';
import { interviewState } from '../models/interview.model';

// Async thunk to upload resume and fetch questions
export const uploadResume: any = createAsyncThunk(
    'interview/uploadResume',
    async (resumeFile: File) => {
        const formData = new FormData();
        formData.append('resume', resumeFile);
        const response = await axios.post(`${API_PYTHON_BASE_URL}/upload_resume`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        const arrayQuestions = parseQuestions(response.data.questions);
        console.log(arrayQuestions);

        return arrayQuestions; // מחזירים את השאלות
    }
);
function parseQuestions(questionsString) {
    // המרת המחרוזת לאובייקט JSON
    const parsedQuestions = JSON.parse(questionsString);

    // ניקוי השאלות ממרחבים נוספים
    const questions = parsedQuestions.map(question => question.trim());

    // יצירת אובייקט שמכיל את השאלות
    return questions;
}
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

export const evaluateResponses: any = createAsyncThunk(
    'interview/evaluateResponses',
    async (feedbackList) => {
        const response = await axios.post(`${API_PYTHON_BASE_URL}/evaluate_responses`, {
            feedback_list: feedbackList,
        });
        return response.data; // מחזירים את הציון הממוצע ואת הסיכום
    }
);

export const initialState: interviewState = {
    questions: [],
    currentQuestionIndex: 0,
    feedbacks: [],
    averageScore: null,
    summary: '',
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
}

const interviewSlice = createSlice({
    name: 'interview',
    initialState,
    reducers: {
        resetInterview: (state) => {
            state.questions = [];
            state.currentQuestionIndex = 0;
            state.feedbacks = [];
        },
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1; // עובר לשאלה הבאה
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadResume.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadResume.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.questions = action.payload;
                console.log( state.questions);
                // state.questions = action.payload.map((question: string) => question.replace(/["']/g, '').trim());
                // console.log(action.payload);

            })
            .addCase(uploadResume.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(checkAnswer.fulfilled, (state, action) => {
                state.feedbacks.push(action.payload);
            })
            .addCase(evaluateResponses.fulfilled, (state, action) => {
                state.averageScore = action.payload.average_score;
                state.summary = action.payload.summary;
            });
    },
});

export const { resetInterview, nextQuestion } = interviewSlice.actions;

export default interviewSlice.reducer;
