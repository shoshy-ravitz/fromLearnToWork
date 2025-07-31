import Notification from './components/common/Notification';
import { NotificationProvider } from './context/NotificationContext';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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