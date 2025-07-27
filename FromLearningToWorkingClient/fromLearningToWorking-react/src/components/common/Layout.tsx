import React from 'react';
import { Box } from '@mui/material';

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <Box sx={{ 
            minHeight: '100vh',
            minWidth: '100vw',
            width: '100%',
            backgroundColor: '#ffffff',
            display: 'flex'
        }}>
            {children}
        </Box>
    );
};

export default PageLayout;