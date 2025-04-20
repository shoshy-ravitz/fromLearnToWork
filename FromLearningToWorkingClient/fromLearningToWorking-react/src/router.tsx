import Home from './components/Home';
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import ResumeUpload from './components/ResumeUpload';
import Interview from './components/Interview';


export const router = createBrowserRouter([
    {
        path: '/', element:<><Navbar /> <Outlet/></> ,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'upload', element: <ResumeUpload /> },
            { path: 'interview', element: <Interview /> },
        ]

    },


]);


