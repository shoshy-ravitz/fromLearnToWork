// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { resultOfInterview } from '../../../store/slices/interviewSlice';
// import { StoreType } from '../../../store/store';
// import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
// import SketchOfInterviewResults from './sketchOfInterviewResults';
// import QuestionsResult from './QuestionsResult';

// const ResultOfInterview = () => {
//     const { id: idParam } = useParams<{ id: string }>(); // Get the interview ID from the route parameters
//     const id = idParam ? Number(idParam) : undefined; // Convert id to a number
//     const dispatch = useDispatch();
//     const { mark, feedback, timeInterview, status, error } = useSelector(
//         (state: StoreType) => state.interview
//     );

//     useEffect(() => {
//         if (id) {
//             dispatch(resultOfInterview(Number(id))); // Fetch the result of the interview
//         }
//     }, [dispatch, id]);

//     if (status === 'loading') {
//         return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
//     }

//     if (status === 'failed') {
//         return (
//             <Typography variant="h6" color="error" style={{ textAlign: 'center', marginTop: '20px' }}>
//                 {error}
//             </Typography>
//         );
//     }

//     return (
//         <Card style={{ maxWidth: 800, margin: '20px auto', padding: '20px' }}>
//             <CardContent>
//                 <Typography variant="h4" gutterBottom>
//                     Interview Result
//                 </Typography>
//                 <Typography variant="h6" color="textSecondary">
//                     Total Mark: {(mark !== undefined && mark !== null) ? mark : 'N/A'}
//                 </Typography>
//                 <Typography variant="h6" color="textSecondary">
//                     Total Time: {timeInterview || 'N/A'} seconds
//                 </Typography>
//                 <Typography variant="body1" style={{ marginBottom: '20px' }}>
//                     {typeof feedback === 'object' ? JSON.stringify(feedback) : feedback || 'No feedback provided.'}
//                 </Typography>
//                 {id !== undefined &&
//                     <>
//                         <SketchOfInterviewResults interviewId={id} />
//                         <QuestionsResult interviewId={id} />
//                     </>}
//             </CardContent>
//         </Card>
//     );
// };

// export default ResultOfInterview;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resultOfInterview } from '../../../store/slices/interviewSlice';
import { StoreType } from '../../../store/store';
import { 
    Box, 
    Container, 
    Typography, 
    CircularProgress, 
    Paper,
    Grid,
    Chip,
    Stack,
    Fade,
    Alert
} from '@mui/material';
import {
    EmojiEvents as TrophyIcon,
    Schedule as TimeIcon,
    Psychology as FeedbackIcon,
    Assessment as AnalyticsIcon
} from '@mui/icons-material';
import SketchOfInterviewResults from './sketchOfInterviewResults';
import QuestionsResult from './QuestionsResult';

const ResultOfInterview: React.FC = () => {
    const { id: idParam } = useParams<{ id: string }>();
    const id = idParam ? Number(idParam) : undefined;
    const dispatch = useDispatch();
    const { mark, feedback, timeInterview, status, error } = useSelector(
        (state: StoreType) => state.interview
    );

    useEffect(() => {
        if (id) {
            dispatch(resultOfInterview(Number(id)));
        }
    }, [dispatch, id]);

    if (status === 'loading') {
        return (
            <Box sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.05) 0%, #ffffff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress 
                        size={60} 
                        sx={{ color: 'rgb(255, 204, 0)', mb: 2 }} 
                    />
                    <Typography variant="h6" sx={{ color: '#666' }}>
                        Loading your interview results...
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (status === 'failed') {
        return (
            <Box sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.05) 0%, #ffffff 100%)',
                paddingTop: '100px'
            }}>
                <Container maxWidth="md">
                    <Alert 
                        severity="error" 
                        sx={{ 
                            borderRadius: 3,
                            border: '1px solid #f44336'
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            Unable to Load Results
                        </Typography>
                        <Typography variant="body2">
                            {error || 'Something went wrong while loading your interview results. Please try again.'}
                        </Typography>
                    </Alert>
                </Container>
            </Box>
        );
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return '#4caf50';
        if (score >= 60) return 'rgb(255, 204, 0)';
        if (score >= 40) return '#ff9800';
        return '#f44336';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        if (score >= 40) return 'Fair';
        return 'Needs Improvement';
    };

    const formatTime = (seconds: number) => {
        if (!seconds) return 'N/A';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.05) 0%, #ffffff 100%)',
            paddingTop: '100px',
            paddingBottom: '40px'
        }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Fade in={true} timeout={600}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Box sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: `rgba(${getScoreColor(mark || 0).replace('#', '')}, 0.1)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3
                        }}>
                            <TrophyIcon sx={{ 
                                fontSize: 40, 
                                color: getScoreColor(mark || 0) 
                            }} />
                        </Box>
                        
                        <Typography variant="h3" sx={{ 
                            fontWeight: 700, 
                            color: '#1a1a1a',
                            mb: 2
                        }}>
                            Interview Results
                        </Typography>
                        
                        <Typography variant="h6" sx={{ 
                            color: '#666',
                            fontWeight: 400
                        }}>
                            Here's your detailed performance analysis
                        </Typography>
                    </Box>
                </Fade>

                {/* Score Overview */}
                <Fade in={true} timeout={800}>
                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        <Grid item xs={12} md={4}>
                            <Paper elevation={0} sx={{
                                p: 4,
                                textAlign: 'center',
                                borderRadius: 4,
                                border: '1px solid #f0f0f0',
                                background: '#ffffff'
                            }}>
                                <Box sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    background: `${getScoreColor(mark || 0)}15`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2
                                }}>
                                    <TrophyIcon sx={{ 
                                        fontSize: 30, 
                                        color: getScoreColor(mark || 0) 
                                    }} />
                                </Box>
                                
                                <Typography variant="h4" sx={{ 
                                    fontWeight: 700, 
                                    color: getScoreColor(mark || 0),
                                    mb: 1
                                }}>
                                    {mark !== undefined && mark !== null ? `${mark}%` : 'N/A'}
                                </Typography>
                                
                                <Typography variant="body2" sx={{ 
                                    color: '#666',
                                    fontWeight: 500
                                }}>
                                    Overall Score
                                </Typography>
                                
                                <Chip 
                                    label={getScoreLabel(mark || 0)}
                                    sx={{
                                        mt: 1,
                                        bgcolor: getScoreColor(mark || 0),
                                        color: 'white',
                                        fontWeight: 600,
                                        fontSize: '0.75rem'
                                    }}
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper elevation={0} sx={{
                                p: 4,
                                textAlign: 'center',
                                borderRadius: 4,
                                border: '1px solid #f0f0f0',
                                background: '#ffffff'
                            }}>
                                <Box sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    background: 'rgba(255, 204, 0, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2
                                }}>
                                    <TimeIcon sx={{ 
                                        fontSize: 30, 
                                        color: 'rgb(255, 204, 0)' 
                                    }} />
                                </Box>
                                
                                <Typography variant="h4" sx={{ 
                                    fontWeight: 700, 
                                    color: '#1a1a1a',
                                    mb: 1
                                }}>
                                    {formatTime(timeInterview)}
                                </Typography>
                                
                                <Typography variant="body2" sx={{ 
                                    color: '#666',
                                    fontWeight: 500
                                }}>
                                    Total Time
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Paper elevation={0} sx={{
                                p: 4,
                                textAlign: 'center',
                                borderRadius: 4,
                                border: '1px solid #f0f0f0',
                                background: '#ffffff'
                            }}>
                                <Box sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    background: 'rgba(33, 150, 243, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 2
                                }}>
                                    <AnalyticsIcon sx={{ 
                                        fontSize: 30, 
                                        color: '#2196f3' 
                                    }} />
                                </Box>
                                
                                <Typography variant="h4" sx={{ 
                                    fontWeight: 700, 
                                    color: '#1a1a1a',
                                    mb: 1
                                }}>
                                    AI
                                </Typography>
                                
                                <Typography variant="body2" sx={{ 
                                    color: '#666',
                                    fontWeight: 500
                                }}>
                                    Analysis Ready
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Fade>

                {/* Feedback Section */}
                <Fade in={true} timeout={1000}>
                    <Paper elevation={0} sx={{
                        p: 4,
                        mb: 6,
                        borderRadius: 4,
                        border: '1px solid #f0f0f0',
                        background: '#ffffff'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'rgba(156, 39, 176, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FeedbackIcon sx={{ color: '#9c27b0', fontSize: 20 }} />
                            </Box>
                            
                            <Typography variant="h5" sx={{ 
                                fontWeight: 600, 
                                color: '#1a1a1a' 
                            }}>
                                AI Feedback & Analysis
                            </Typography>
                        </Box>
                        
                        <Typography variant="body1" sx={{ 
                            color: '#555',
                            lineHeight: 1.8,
                            fontSize: '1.1rem'
                        }}>
                            {typeof feedback === 'object' 
                                ? JSON.stringify(feedback) 
                                : feedback || 'No detailed feedback available at this time. Our AI is continuously improving to provide better insights.'
                            }
                        </Typography>
                    </Paper>
                </Fade>

                {/* Charts and Detailed Results */}
                {id !== undefined && (
                    <>
                        <Fade in={true} timeout={1200}>
                            <Box sx={{ mb: 6 }}>
                                <SketchOfInterviewResults interviewId={id} />
                            </Box>
                        </Fade>
                        
                        <Fade in={true} timeout={1400}>
                            <Box>
                                <QuestionsResult interviewId={id} />
                            </Box>
                        </Fade>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default ResultOfInterview;
