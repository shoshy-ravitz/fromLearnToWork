import { useState, useCallback } from 'react';

interface NotificationState {
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    open: boolean;
}

const useNotification = () => {
    const [notification, setNotification] = useState<NotificationState>({
        message: '',
        severity: 'info',
        open: false,
    });

    const showNotification = useCallback((message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
        setNotification({ message, severity, open: true });
        console.log('Notification shown:', { message, severity });
        
    }, []);

    const closeNotification = useCallback(() => {
        setNotification((prev) => ({ ...prev, open: false }));
    }, []);

    return { notification, showNotification, closeNotification };
};

export default useNotification;