// import Notification from './components/common/Notification';
// import { NotificationProvider } from './context/NotificationContext';
// import React from 'react';
// import { RouterProvider } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { router } from './router/router';
// import store from './store/store';



// function App() {

//   return (
//     <Provider store={store}> 
//       <NotificationProvider>
//         <Notification />
//         <RouterProvider router={router} />
//       </NotificationProvider>
//     </Provider>
//   );
// }

// export default App;

// import Notification from './components/common/Notification';
// import { NotificationProvider } from './context/NotificationContext';
// import React from 'react';
// import { RouterProvider } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { router } from './router/router';
// import store from './store/store';
// import { ThemeProvider } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material';
// import theme from './styles/theme';

// function App() {
//   return (
//     <Provider store={store}> 
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <NotificationProvider>
//           <Notification />
//           <RouterProvider router={router} />
//         </NotificationProvider>
//       </ThemeProvider>
//     </Provider>
//   );
// }

// export default App;
// import Notification from './components/common/Notification';
// import { NotificationProvider } from './context/NotificationContext';
// import React from 'react';
// import { RouterProvider } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { router } from './router/router';
// import store from './store/store';
// import { ThemeProvider } from '@mui/material/styles';
// import { CssBaseline, Box } from '@mui/material';
// import theme from './styles/theme';
// import Navbar from './components/common/Navbar';

// function App() {
//   return (
//     <Provider store={store}> 
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <NotificationProvider>
//           <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//             <Navbar />
//             <Box
//               component="main"
//               sx={{
//                 flexGrow: 1,
//                 backgroundColor: '#ffffff',
//                 minHeight: '100vh',
//                 transition: 'margin-left 0.3s ease'
//               }}
//             >
//               <Notification />
//               <RouterProvider router={router} />
//             </Box>
//           </Box>
//         </NotificationProvider>
//       </ThemeProvider>
//     </Provider>
//   );
// }

// export default App;
import Notification from './components/common/Notification';
import { NotificationProvider } from './context/NotificationContext';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './router/router';
import store from './store/store';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './styles/theme';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <Notification />
          <RouterProvider router={router} />
        </NotificationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;