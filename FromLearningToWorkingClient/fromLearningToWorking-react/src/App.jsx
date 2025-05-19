import Notification from './components/common/Notification';
import { NotificationProvider } from './context/NotificationContext';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './router/router';
import store from './store/store';



function App() {

  return (
    <Provider store={store}> 
      <NotificationProvider>
        <Notification />
        <RouterProvider router={router} />
      </NotificationProvider>
    </Provider>
  );
}

export default App;
