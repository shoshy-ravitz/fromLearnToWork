// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createInterview, } from '../../../store/slices/interviewSlice';
// import { User } from '../../../models/user.model';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';


// const CreateInterview = () => {
//     const dispatch = useDispatch();
//     const userId :User= useSelector((state: any) => state.auth.userId);
//     const navigate = useNavigate();
    
//     const createNewInterview = () => {
//         if (!userId) {
//             alert('משתמש לא מזוהה. אנא התחבר.');
//             navigate('/login');
//         }
//         dispatch(createInterview({ userId: userId }))
//     }

//     return (
//         <>
//             <Button onClick={() => createNewInterview()}>start interview</Button>
//         </>
//     );
// };

// export default CreateInterview;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createInterview } from '../../../store/slices/interviewSlice';
import { User } from '../../../models/user.model';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    CircularProgress,
    Box,
    Typography,
    Alert,
    Fade
} from '@mui/material';
import {
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

interface CreateInterviewProps {
    selectedLevel: string;
}

const CreateInterview: React.FC<CreateInterviewProps> = ({ selectedLevel }) => {
    const dispatch = useDispatch();
    const userId: User = useSelector((state: any) => state.auth.userId);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createNewInterview = async () => {
        if (!userId) {
            setError('Please log in to start an interview');
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        if (!selectedLevel) {
            setError('Please select an interview level first');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await dispatch(createInterview({ 
                userId: userId, 
                interviewLevel: selectedLevel 
            })).unwrap();
        } catch (error: any) {
            setError('Failed to create interview. Please try again.');
            console.error('Error creating interview:', error);
        } finally {
            setLoading(false);
        }
    };

    const getLevelDisplayName = () => {
        switch (selectedLevel) {
            case 'entry': return 'Entry Level';
            case 'mid': return 'Mid Level';
            case 'senior': return 'Senior Level';
            default: return 'Selected Level';
        }
    };

    if (!selectedLevel) {
        return null;
    }

    return (
        <Box sx={{ textAlign: 'center' }}>
            {error && (
                <Fade in={true} timeout={600}>
                    <Alert 
                        severity="error" 
                        sx={{ 
                            mb: 3, 
                            borderRadius: 3,
                            maxWidth: 400,
                            mx: 'auto'
                        }}
                    >
                        {error}
                    </Alert>
                </Fade>
            )}
            
            <Fade in={selectedLevel !== ''} timeout={800}>
                <Box>
                    <Typography variant="h6" sx={{ 
                        color: '#1a1a1a', 
                        mb: 3,
                        fontWeight: 500
                    }}>
                        Ready to start your <strong>{getLevelDisplayName()}</strong> interview?
                    </Typography>
                    
                    <Button
                        onClick={createNewInterview}
                        disabled={loading}
                        variant="contained"
                        size="large"
                        endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowForwardIcon />}
                        sx={{
                            bgcolor: 'rgb(255, 204, 0)',
                            color: '#1a1a1a',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            px: 4,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: 'none',
                            boxShadow: '0 4px 12px rgba(255, 204, 0, 0.3)',
                            '&:hover': {
                                bgcolor: '#f0b800',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 16px rgba(255, 204, 0, 0.4)'
                            },
                            '&:disabled': {
                                bgcolor: '#ccc',
                                color: '#666',
                                transform: 'none',
                                boxShadow: 'none'
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {loading ? 'Preparing Your Interview...' : 'Start Interview'}
                    </Button>
                    
                    {loading && (
                        <Fade in={loading} timeout={400}>
                            <Typography variant="body2" sx={{ 
                                color: '#666', 
                                mt: 2,
                                fontStyle: 'italic'
                            }}>
                                Our AI is preparing personalized questions for you...
                            </Typography>
                        </Fade>
                    )}
                </Box>
            </Fade>
        </Box>
    );
};

export default CreateInterview;
