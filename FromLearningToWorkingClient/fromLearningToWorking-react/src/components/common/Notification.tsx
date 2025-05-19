import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useNotification } from '../../context/NotificationContext';

const Notification: React.FC = () => {
    const { notification, closeNotification } = useNotification();

    return (
        <Snackbar open={notification.open} onClose={closeNotification}>
            <Alert
                severity={notification.severity}
                action={
                    <Button color="inherit" size="small" onClick={closeNotification}>
                        OK
                    </Button>
                }
                sx={{ width: '100%' }}
            >
                {notification.message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;