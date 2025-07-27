// // import React from 'react';
// // import Login from '../components/auth/Login';
// // import Navbar from '../components/common/Navbar';
// // import { createBrowserRouter, Outlet } from 'react-router-dom';
// // import ResumeUpload from '../components/resume/ResumeUpload';
// // import Interview from '../components/interview/activeInterview/Interview';
// // import ResultOfInterview from '../components/interview/resultInterview/ResultOfInterview';
// // import InterviewHistory from '../components/interview/resultInterview/InterviewHistory';
// // import GeneralFeedbackForInterviews from '../components/interview/resultInterview/GeneralFeedbackForInterviews';
// // import UpdateProfile from '../components/profile/UpdateProfile';
// // import Home from '../pages/Home';
// // import Register from '../components/auth/Register';
// // import AddResume from '../components/resume/AddResume';
// // import DownloadResume from '../components/resume/DownLoadResume';
// // import UpdateResume from '../components/resume/UpdateResume';
// // import Logout from '../components/auth/Logout';


// // export const router = createBrowserRouter([
// //     {
// //         path: '/', element: <><Navbar /> <Outlet /></>,
// //         children: [
// //             { path: 'home', element: <Home /> },
// //             { path: 'login', element: <Login /> },
// //             { path: 'logout', element: <Logout /> },

// //             { path: 'register', element: <Register /> },
// //             { path: 'update', element: <UpdateProfile /> },
// //             { path: 'upload', element: <AddResume /> },
// //             { path: 'interview', element: <Interview /> },
// //             { path: 'download', element: <DownloadResume /> },
// //             { path: 'updateResume', element: <UpdateResume/> },

// //             {
// //                 path: 'histoyInterview', element:<InterviewHistory/>, 
// //                 children: [
// //                     { path: '', element: <GeneralFeedbackForInterviews /> },
// //                     { path: 'resultInterview/:id', element: <ResultOfInterview /> }, // Route for ResultOfInterview

// //                 ]
// //             },

// //             { path: 'resultInterview/:id', element: <ResultOfInterview /> }, // Route for ResultOfInterview
// //         ]
// //     },
// // ]);
// import Login from "../components/auth/Login"
// import Register from "../components/auth/Register"
// import Logout from "../components/auth/Logout"
// import UpdateProfile from "../components/profile/UpdateProfile"
// import { createBrowserRouter, Outlet } from "react-router-dom"
// import Interview from "../components/interview/activeInterview/Interview"
// import ResultOfInterview from "../components/interview/resultInterview/ResultOfInterview"
// import InterviewHistory from "../components/interview/resultInterview/InterviewHistory"
// import GeneralFeedbackForInterviews from "../components/interview/resultInterview/GeneralFeedbackForInterviews"
// import AddResume from "../components/resume/AddResume"
// import DownloadResume from "../components/resume/DownLoadResume"
// import React from "react"
// import InterviewTipsPage from "../pages/InterviewTipsPage"
// import Home from "../pages/Home"
// import UpdateResume from "../components/resume/UpdateResume"
// import Navbar from "../components/common/Navbar"

// // הוספתי את עמוד הטיפים החדש לראוטר
// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <>
//         <div
//           style={{
//             minHeight: "100vh", 
//             minWidth: "100vw", 
//             display: "flex", 
//             flexDirection: "column", 
//           }}
//         >
//           <Outlet />
//         </div>

//       </>
//     ), // הסרתי את ה-Navbar מכאן כי הוא כלול בסידבר
//     children: [
//       { path: "", element: <Navbar /> }, // דף הבית כברירת מחדל
//       { path: "home", element: <Home /> },
//       { path: "login", element: <Login /> },
//       { path: "logout", element: <Logout /> },
//       { path: "register", element: <Register /> },
//       { path: "update", element: <UpdateProfile /> },
//       { path: "upload", element: <AddResume /> },
//       { path: "interview", element: <Interview /> },
//       { path: "download", element: <DownloadResume /> },
//       { path: "updateResume", element: <UpdateResume /> },
//       { path: "tips", element: <InterviewTipsPage /> }, // עמוד הטיפים החדש
//       {
//         path: "histoyInterview",
//         element: <InterviewHistory />,
//         children: [
//           { path: "", element: <GeneralFeedbackForInterviews /> },
//           { path: "resultInterview/:id", element: <ResultOfInterview /> },
//         ],
//       },
//       { path: "resultInterview/:id", element: <ResultOfInterview /> },
//     ],
//   },
// ])
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
            <Navbar/>
            <Outlet />
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
            { path: 'resultInterview/:id', element: <ResultOfInterview /> },
        ]
    },
]);