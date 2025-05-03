import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './router';
import store from './store/store';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';


function App() {
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
          <RouterProvider router={router} />
        </Container>

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
