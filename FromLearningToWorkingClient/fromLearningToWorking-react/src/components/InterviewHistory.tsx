import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchUserInterviews } from '../store/userInterviewsSlice';
import { StoreType } from '../store/store';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const InterviewHistory = () => {
    const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listInterviews = useSelector((state: StoreType) => state.userInterviews.interviews);

    const [isOpen, setIsOpen] = useState(true); // Sidebar starts open by default

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserInterviews(Number(userId))); // Fetch the list of interviews
        }
    }, [dispatch, userId]);

    const handleNavigate = (interviewId: number) => {
        setIsOpen(false); // Close the sidebar when navigating
        navigate(`resultInterview/${interviewId}`);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
            {/* Sidebar */}
            <Drawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                sx={{
                    width: isOpen ? 240 : 50,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isOpen ? 240 : 50,
                        boxSizing: 'border-box',
                        overflowX: 'hidden',
                        transition: 'width 0.3s',
                    },
                }}
            >
                {isOpen && (
                    <Box sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Interview History
                        </Typography>
                        <List>
                            {listInterviews.map((interview) => (
                                <ListItem key={interview.id} disablePadding>
                                    <ListItemButton onClick={() => handleNavigate(interview.id)}>
                                        <ListItemText
                                            primary={`Interview ID: ${interview.id}`}
                                            secondary={`Mark: ${interview.mark}`}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Drawer>

            {/* Toggle Button */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: isOpen ? 240 : 50,
                    transform: 'translateY(-50%)',
                    zIndex: 1000,
                }}
            >
                <IconButton onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    padding: 2,
                    overflowY: 'auto', // Enable scrolling for long content
                    scrollbarWidth: 'none', // Hide scrollbar for Firefox
                    '&::-webkit-scrollbar': {
                        display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
                    },
                }}
            >
                <Outlet />
            </Box>
        </div>
    );
};

export default InterviewHistory;