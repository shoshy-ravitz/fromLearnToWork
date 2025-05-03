import Home from './components/Home';
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import ResumeUpload from './components/ResumeUpload';
import Interview from './components/Interview';
import ResultOfInterview from './components/ResultOfInterview';
import InterviewHistory from './components/InterviewHistory';

export const router = createBrowserRouter([
    {
        path: '/', element: <><Navbar /> <Outlet /></>,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'upload', element: <ResumeUpload /> },
            { path: 'interview', element: <Interview /> },
            {
                path: 'histoyInterview', element:<><InterviewHistory/> </> , children: [
                    { path: 'resultInterview/:id', element: <ResultOfInterview /> }, // Route for ResultOfInterview

                ]
            },

            { path: 'resultInterview/:id', element: <ResultOfInterview /> }, // Route for ResultOfInterview
        ]
    },
]);


