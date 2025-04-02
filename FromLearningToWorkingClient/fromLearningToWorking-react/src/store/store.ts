import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import resumeSlice from "./resumeSlice";
import interviewSlice from "./interviewSlice";

const store = configureStore({
    reducer: combineReducers({
        auth: authSlice,
        resumeSlice,
        interview:interviewSlice,
        
    }),
});

export type StoreType = ReturnType<typeof store.getState>

export default store