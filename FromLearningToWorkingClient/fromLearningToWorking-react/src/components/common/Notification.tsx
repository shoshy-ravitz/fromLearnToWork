import React from 'react';
import {
    Snackbar,
    Alert,
    AlertTitle,
    Button,
    IconButton,
    Slide,
    Box,
    Typography
} from '@mui/material';
import {
    Close as CloseIcon,
    CheckCircle as SuccessIcon,
    Error as ErrorIcon,
    Warning as WarningIcon,
    Info as InfoIcon
} from '@mui/icons-material';
import { useNotification } from '../../context/NotificationContext';
import { SlideProps } from '@mui/material/Slide';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

const Notification: React.FC = () => {
    const { notification, closeNotification } = useNotification();

    const getIcon = (severity: string) => {
        switch (severity) {
            case 'success':
                return <SuccessIcon sx={{ fontSize: 24 }} />;
            case 'error':
                return <ErrorIcon sx={{ fontSize: 24 }} />;
            case 'warning':
                return <WarningIcon sx={{ fontSize: 24 }} />;
            case 'info':
                return <InfoIcon sx={{ fontSize: 24 }} />;
            default:
                return <InfoIcon sx={{ fontSize: 24 }} />;
        }
    };

    const getColors = (severity: string) => {
        switch (severity) {
            case 'success':
                return {
                    bg: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                    color: '#ffffff',
                    iconColor: '#ffffff'
                };
            case 'error':
                return {
                    bg: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                    color: '#ffffff',
                    iconColor: '#ffffff'
                };
            case 'warning':
                return {
                    bg: 'linear-gradient(135deg, rgb(255, 204, 0) 0%, #f0b800 100%)',
                    color: '#1a1a1a',
                    iconColor: '#1a1a1a'
                };
            case 'info':
                return {
                    bg: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                    color: '#ffffff',
                    iconColor: '#ffffff'
                };
            default:
                return {
                    bg: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                    color: '#ffffff',
                    iconColor: '#ffffff'
                };
        }
    };

    const colors = getColors(notification.severity);

    return (
        <Snackbar
            open={notification.open}
            onClose={closeNotification}
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{
                top: '90px !important',
                '& .MuiSnackbar-root': {
                    top: '90px !important'
                }
            }}
            autoHideDuration={5000}
        >
            <Box
                sx={{
                    background: colors.bg,
                    color: colors.color,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    minWidth: 350,
                    maxWidth: 500,
                    p: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent 50%)',
                        pointerEvents: 'none'
                    }
                }}
            >
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 2,
                    position: 'relative',
                    zIndex: 1
                }}>
                    {/* Icon */}
                    <Box sx={{ 
                        color: colors.iconColor,
                        mt: 0.5,
                        opacity: 0.9
                    }}>
                        {getIcon(notification.severity)}
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                color: colors.color,
                                mb: 0.5,
                                fontSize: '1rem',
                                textTransform: 'capitalize'
                            }}
                        >
                            {notification.severity === 'success' && 'Success'}
                            {notification.severity === 'error' && 'Error'}
                            {notification.severity === 'warning' && 'Warning'}
                            {notification.severity === 'info' && 'Information'}
                        </Typography>
                        
                        <Typography
                            variant="body2"
                            sx={{
                                color: colors.color,
                                opacity: 0.95,
                                lineHeight: 1.4,
                                fontSize: '0.9rem'
                            }}
                        >
                            {notification.message}
                        </Typography>
                    </Box>

                    {/* Close Button */}
                    <IconButton
                        onClick={closeNotification}
                        size="small"
                        sx={{
                            color: colors.iconColor,
                            opacity: 0.8,
                            padding: 0.5,
                            '&:hover': {
                                opacity: 1,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                transform: 'scale(1.1)'
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <CloseIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>

                {/* Progress Bar */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: 3,
                        background: 'rgba(255, 255, 255, 0.3)',
                        animation: 'shrink 5s linear forwards',
                        borderRadius: '0 0 12px 12px'
                    }}
                />
            </Box>
        </Snackbar>
    );
};

// Add keyframes for progress bar animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shrink {
        from {
            width: 100%;
        }
        to {
            width: 0%;
        }
    }
`;
document.head.appendChild(style);

export default Notification;
