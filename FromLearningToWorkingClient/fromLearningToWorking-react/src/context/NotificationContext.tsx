import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationState {
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
    open: boolean;
}

interface NotificationContextProps {
    notification: NotificationState;
    showNotification: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
    closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState<NotificationState>({
        message: '',
        severity: 'info',
        open: false,
    });

    const showNotification = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
        setNotification({ message, severity, open: true });
    };

    const closeNotification = () => {
        setNotification((prev) => ({ ...prev, open: false }));
    };

    return (
        <NotificationContext.Provider value={{ notification, showNotification, closeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextProps => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};