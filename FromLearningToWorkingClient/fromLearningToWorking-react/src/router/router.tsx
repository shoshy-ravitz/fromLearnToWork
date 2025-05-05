import React from 'react';
import Login from '../components/auth/Login';
import Navbar from '../components/common/Navbar';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import ResumeUpload from '../components/resume/ResumeUpload';
import Interview from '../components/interview/activeInterview/Interview';
import ResultOfInterview from '../components/interview/resultInterview/ResultOfInterview';
import InterviewHistory from '../components/interview/resultInterview/InterviewHistory';
import GeneralFeedbackForInterviews from '../components/interview/resultInterview/GeneralFeedbackForInterviews';
import UpdateProfile from '../components/profile/UpdateProfile';
import Home from '../pages/Home';
import Register from '../components/auth/Register';

export const router = createBrowserRouter([
    {
        path: '/', element: <><Navbar /> <Outlet /></>,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'update', element: <UpdateProfile /> },
            { path: 'upload', element: <ResumeUpload /> },
            { path: 'interview', element: <Interview /> },
            {
                path: 'histoyInterview', element:<InterviewHistory/>, 
                children: [
                    { path: '', element: <GeneralFeedbackForInterviews /> },
                    { path: 'resultInterview/:id', element: <ResultOfInterview /> }, // Route for ResultOfInterview

                ]
            },

            { path: 'resultInterview/:id', element: <ResultOfInterview /> }, // Route for ResultOfInterview
        ]
    },
]);


