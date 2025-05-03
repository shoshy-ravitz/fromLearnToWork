import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import resumeSlice from "./resumeSlice";
import interviewSlice from "./interviewSlice";
import totalResultSlice from "./totalResultSlice"; // Import the new slice
import userInterviewsSlice from "./userInterviewsSlice";

const store = configureStore({
    reducer: combineReducers({
        auth: authSlice,
        resumeSlice,
        interview: interviewSlice,
        totalResult: totalResultSlice, 
        userInterviews:userInterviewsSlice,
    }),
});

export type StoreType = ReturnType<typeof store.getState>;

export default store;