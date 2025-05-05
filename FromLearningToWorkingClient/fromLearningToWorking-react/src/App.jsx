import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './router/router';
import store from './store/store';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { useEffect } from 'react';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { sendEmail } from './hooks/emailService';
import sendEmail from './hooks/emailService';
function App() {
  useEffect(() => {
   
  }, []);
  const sendEmails=()=>{
    // debugger
    sendEmail(
      'client-email@example.com',
      'Logout Notification',
      'You have successfully logged out.'
  );
  }
  return (
    <Provider store={store}>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '150vh' }}>
        {/* Header */}
        <AppBar position="static" sx={{ backgroundColor: '#4caf50' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Job Interview Simulation
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container sx={{ flex: 1, py: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to the Job Interview Simulation
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
            Prepare yourself for success with our interactive platform!   
          </Typography>
          <button onClick={sendEmails}>Send Email</button>
          <RouterProvider router={router} />
        </Container>
           {/* ToastContainer */}
           <ToastContainer
          position="top-center" // Ensure the toast appears in the middle of the page
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Footer */}
        <Box component="footer" sx={{ backgroundColor: '#333', color: 'white', py: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            &copy; 2025 From Learning to Working. All rights reserved.
          </Typography>
        </Box>
      </Box>
     
    </Provider>
  );
}

export default App;
