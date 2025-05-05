import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import resumeSlice from "./slices/resumeSlice";
import interviewSlice from "./slices/interviewSlice";
import totalResultSlice from "./slices/totalResultSlice"; // Import the new slice
import userInterviewsSlice from "./slices/userInterviewsSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: combineReducers({
        auth: authSlice,
        resume:resumeSlice,
        interview: interviewSlice,
        totalResult: totalResultSlice, 
        userInterviews:userInterviewsSlice,
        user:userSlice,
    }),
});

export type StoreType = ReturnType<typeof store.getState>;

export default store;