// import React from 'react';
// import { createBrowserRouter, Outlet } from 'react-router-dom';
// import { Box } from '@mui/material';

// // Import components
// import Login from '../components/auth/Login';
// import Register from '../components/auth/Register';
// import Logout from '../components/auth/Logout';
// import UpdateProfile from '../components/profile/UpdateProfile';
// import Home from '../pages/Home';
// import AddResume from '../components/resume/AddResume';
// import DownloadResume from '../components/resume/DownLoadResume';
// import UpdateResume from '../components/resume/UpdateResume';
// import Interview from '../components/interview/activeInterview/Interview';
// import InterviewHistory from '../components/interview/resultInterview/InterviewHistory';
// import ResultOfInterview from '../components/interview/resultInterview/ResultOfInterview';
// import GeneralFeedbackForInterviews from '../components/interview/resultInterview/GeneralFeedbackForInterviews';
// import PageLayout from '../components/common/Layout';
// import Navbar from '../components/common/Navbar';


// export const router = createBrowserRouter([
//     {
//         path: '/', 
//         element: (
     
//           <PageLayout>
//             <Navbar/>
//             <Outlet />
//           </PageLayout>
        
//         ),
//         children: [
//             { path: '', element: <Home /> }, // Default route
//             { path: 'home', element: <Home /> },
//             { path: 'login', element: <Login /> },
//             { path: 'logout', element: <Logout /> },
//             { path: 'register', element: <Register /> },
//             { path: 'update', element: <UpdateProfile /> },
//             { path: 'upload', element: <AddResume /> },
//             { path: 'interview', element: <Interview /> },
//             { path: 'download', element: <DownloadResume /> },
//             { path: 'updateResume', element: <UpdateResume /> },
//             {
//                 path: 'histoyInterview', 
//                 element: <InterviewHistory />, 
//                 children: [
//                     { path: '', element: <GeneralFeedbackForInterviews /> },
//                     { path: 'resultInterview/:id', element: <ResultOfInterview /> },
//                 ]
//             },
//             { path: 'resultInterview/:id', element: <ResultOfInterview /> },
//         ]
//     },
// ]);
import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

// Import components
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Logout from '../components/auth/Logout';
import UpdateProfile from '../components/profile/UpdateProfile';
import Home from '../pages/Home';
import AddResume from '../components/resume/AddResume';
import DownloadResume from '../components/resume/DownLoadResume';
import UpdateResume from '../components/resume/UpdateResume';
import Interview from '../components/interview/activeInterview/Interview';
import InterviewHistory from '../components/interview/resultInterview/InterviewHistory';
import ResultOfInterview from '../components/interview/resultInterview/ResultOfInterview';
import GeneralFeedbackForInterviews from '../components/interview/resultInterview/GeneralFeedbackForInterviews';
import PageLayout from '../components/common/Layout';
import Navbar from '../components/common/Navbar';

export const router = createBrowserRouter([
    {
        path: '/', 
        element: (
            <PageLayout>
                <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                    <Navbar />
                    <Box 
                        component="main" 
                        sx={{ 
                            flexGrow: 1,
                            width: '100%',
                            backgroundColor: '#ffffff',
                            minHeight: '100vh'
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </PageLayout>
        ),
        children: [
            { path: '', element: <Home /> }, // Default route
            { path: 'home', element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'logout', element: <Logout /> },
            { path: 'register', element: <Register /> },
            { path: 'update', element: <UpdateProfile /> },
            { path: 'upload', element: <AddResume /> },
            { path: 'interview', element: <Interview /> },
            { path: 'download', element: <DownloadResume /> },
            { path: 'updateResume', element: <UpdateResume /> },
            {
                path: 'histoyInterview', 
                element: <InterviewHistory />, 
                children: [
                    { path: '', element: <GeneralFeedbackForInterviews /> },
                    { path: 'resultInterview/:id', element: <ResultOfInterview /> },
                ]
            },
            // Alternative direct route for interview results
            { path: 'resultInterview/:id', element: <ResultOfInterview /> },
        ]
    },
]);