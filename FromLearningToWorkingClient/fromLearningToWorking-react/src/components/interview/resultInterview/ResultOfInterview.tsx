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
    Avatar,
    Card,
    CardContent
} from '@mui/material';
import {
    EmojiEvents as TrophyIcon,
    Schedule as TimeIcon,
    Psychology as FeedbackIcon,
    Assessment as AnalyticsIcon,
    Star as StarIcon,
    TrendingUp as TrendingUpIcon,
    CheckCircle as CheckCircleIcon,
    Speed as SpeedIcon
} from '@mui/icons-material';

import SketchOfInterviewResults from './SketchOfInterviewResults';
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
                <Box sx={{ 
                    textAlign: 'center',
                    p: 4,
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 4,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 204, 0, 0.2)'
                }}>
                    <CircularProgress 
                        size={60} 
                        sx={{ 
                            color: 'rgb(255, 204, 0)', 
                            mb: 3,
                            '& .MuiCircularProgress-circle': {
                                strokeLinecap: 'round',
                            }
                        }} 
                    />
                    <Typography variant="h6" sx={{ 
                        color: '#1a1a1a',
                        fontWeight: 600,
                        mb: 1
                    }}>
                        Processing interview results
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        Please wait while the system analyzes your performance...
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
                    <Paper elevation={0} sx={{
                        p: 4,
                        textAlign: 'center',
                        borderRadius: 4,
                        border: '2px solid #f44336',
                        background: 'rgba(244, 67, 54, 0.05)'
                    }}>
                        <Avatar sx={{ 
                            bgcolor: '#f44336',
                            width: 64,
                            height: 64,
                            mx: 'auto',
                            mb: 2
                        }}>
                            <TrophyIcon sx={{ fontSize: 32 }} />
                        </Avatar>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
                            Error loading results
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666' }}>
                            {/* {error ? JSON.stringify(error) : 'An error occurred while loading the data'} */}
                            {/* {error || 'Something went wrong while loading the interview results. Please try again later.'} */}
                        </Typography>
                    </Paper>
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
        if (score >= 40) return 'Average';
        return 'Needs Improvement';
    };

    const formatTime = (seconds: number) => {
        if (!seconds) return 'Not available';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} minutes and ${secs} seconds`;
    };

    const getPerformanceInsights = (score: number) => {
        if (score >= 80) {
            return {
                title: 'Outstanding Performance!',
                message: 'Your interview went excellently. You are ready for the job market!',
                icon: <CheckCircleIcon sx={{ color: '#4caf50' }} />,
                tips: [
                    'Keep practicing to maintain your level',
                    'Focus on strengthening your strengths',
                    'Consider practicing for more advanced roles'
                ]
            };
        } else if (score >= 60) {
            return {
                title: 'Good Performance',
                message: 'You have a strong foundation, with a little room for improvement.',
                icon: <TrendingUpIcon sx={{ color: 'rgb(255, 204, 0)' }} />,
                tips: [
                    'Work on the weaknesses identified',
                    'Practice more challenging questions',
                    'Boost your self-confidence'
                ]
            };
        } else {
            return {
                title: 'Room for Improvement',
                message: 'With more practice, you can achieve better results.',
                icon: <SpeedIcon sx={{ color: '#ff9800' }} />,
                tips: [
                    'Focus on basic practice',
                    'Learn from the feedback you received',
                    'Try again after additional practice'
                ]
            };
        }
    };

    const insights = getPerformanceInsights(mark || 0);

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.05) 0%, #ffffff 100%)',
            paddingTop: '100px',
            paddingBottom: '40px'
        }}>
            <Container maxWidth="lg">
                {/* Header with Main Score */}
                <Fade in={true} timeout={600}>
                    <Paper elevation={0} sx={{
                        p: 6,
                        mb: 6,
                        textAlign: 'center',
                        borderRadius: 4,
                        border: '1px solid #f0f0f0',
                        background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 4,
                            background: `linear-gradient(90deg, ${getScoreColor(mark || 0)} 0%, ${getScoreColor(mark || 0)}aa 100%)`
                        }
                    }}>
                        <Avatar sx={{
                            bgcolor: getScoreColor(mark || 0),
                            width: 80,
                            height: 80,
                            mx: 'auto',
                            mb: 3,
                            boxShadow: `0 8px 24px ${getScoreColor(mark || 0)}40`
                        }}>
                            <TrophyIcon sx={{ fontSize: 40, color: 'white' }} />
                        </Avatar>
                        
                        <Typography variant="h3" sx={{ 
                            fontWeight: 700, 
                            color: '#1a1a1a',
                            mb: 1
                        }}>
                            Your Interview Results
                        </Typography>
                        
                        <Typography variant="h1" sx={{ 
                            fontSize: '4rem',
                            fontWeight: 800,
                            color: getScoreColor(mark || 0),
                            mb: 1,
                            textShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}>
                            {mark !== undefined && mark !== null ? `${mark}%` : 'Not available'}
                        </Typography>
                        
                        <Chip 
                            label={getScoreLabel(mark || 0)}
                            sx={{
                                bgcolor: getScoreColor(mark || 0),
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                px: 2,
                                py: 1
                            }}
                        />
                    </Paper>
                </Fade>

                {/* Performance Cards */}
                <Fade in={true} timeout={800}>
                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        <Grid item xs={12} md={4}>
                            <Card sx={{
                                height: '100%',
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                border: '1px solid #e0e0e0',
                                borderRadius: 4,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 32px rgba(0,0,0,0.1)'
                                }
                            }}>
                                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                    <Avatar sx={{
                                        bgcolor: 'rgba(255, 204, 0, 0.1)',
                                        width: 60,
                                        height: 60,
                                        mx: 'auto',
                                        mb: 2
                                    }}>
                                        <TimeIcon sx={{ color: 'rgb(255, 204, 0)', fontSize: 30 }} />
                                    </Avatar>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        Interview Time
                                    </Typography>
                                    <Typography variant="h4" sx={{ 
                                        fontWeight: 700, 
                                        color: '#1a1a1a',
                                        fontSize: '1.5rem'
                                    }}>
                                        {formatTime(timeInterview)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card sx={{
                                height: '100%',
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                border: '1px solid #e0e0e0',
                                borderRadius: 4,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 32px rgba(0,0,0,0.1)'
                                }
                            }}>
                                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                    <Avatar sx={{
                                        bgcolor: 'rgba(33, 150, 243, 0.1)',
                                        width: 60,
                                        height: 60,
                                        mx: 'auto',
                                        mb: 2
                                    }}>
                                        <AnalyticsIcon sx={{ color: '#2196f3', fontSize: 30 }} />
                                    </Avatar>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        AI Analysis
                                    </Typography>
                                    <Typography variant="h4" sx={{ 
                                        fontWeight: 700, 
                                        color: '#1a1a1a',
                                        fontSize: '1.5rem'
                                    }}>
                                        Ready
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card sx={{
                                height: '100%',
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                border: '1px solid #e0e0e0',
                                borderRadius: 4,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 32px rgba(0,0,0,0.1)'
                                }
                            }}>
                                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                    <Avatar sx={{
                                        bgcolor: 'rgba(76, 175, 80, 0.1)',
                                        width: 60,
                                        height: 60,
                                        mx: 'auto',
                                        mb: 2
                                    }}>
                                        <StarIcon sx={{ color: '#4caf50', fontSize: 30 }} />
                                    </Avatar>
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                        Overall Rating
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 1 }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon 
                                                key={star} 
                                                sx={{ 
                                                    color: star <= Math.ceil((mark || 0) / 20) ? '#ffc107' : '#e0e0e0',
                                                    fontSize: 24
                                                }} 
                                            />
                                        ))}
                                    </Box>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        {Math.ceil((mark || 0) / 20)} out of 5 stars
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Fade>

                {/* Performance Insights */}
                <Fade in={true} timeout={1000}>
                    <Paper elevation={0} sx={{
                        p: 4,
                        mb: 6,
                        borderRadius: 4,
                        border: '1px solid #f0f0f0',
                        background: '#ffffff'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                            <Avatar sx={{
                                bgcolor: 'rgba(255, 204, 0, 0.1)',
                                width: 60,
                                height: 60
                            }}>
                                {insights.icon}
                            </Avatar>
                            
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h5" sx={{ 
                                    fontWeight: 600, 
                                    color: '#1a1a1a',
                                    mb: 1
                                }}>
                                    {insights.title}
                                </Typography>
                                
                                <Typography variant="body1" sx={{ 
                                    color: '#666',
                                    mb: 3,
                                    fontSize: '1.1rem',
                                    lineHeight: 1.6
                                }}>
                                    {insights.message}
                                </Typography>

                                <Typography variant="h6" sx={{ 
                                    fontWeight: 600, 
                                    color: '#1a1a1a',
                                    mb: 2
                                }}>
                                    Improvement Recommendations:
                                </Typography>
                                
                                <Stack spacing={1}>
                                    {insights.tips.map((tip, index) => (
                                        <Box key={index} sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: 2
                                        }}>
                                            <CheckCircleIcon sx={{ 
                                                color: 'rgb(255, 204, 0)', 
                                                fontSize: 20 
                                            }} />
                                            <Typography variant="body2" sx={{ color: '#555' }}>
                                                {tip}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        </Box>
                    </Paper>
                </Fade>

                {/* AI Feedback Section */}
                <Fade in={true} timeout={1200}>
                    <Paper elevation={0} sx={{
                        p: 4,
                        mb: 6,
                        borderRadius: 4,
                        border: '1px solid #f0f0f0',
                        background: '#ffffff'
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Avatar sx={{
                                bgcolor: 'rgba(156, 39, 176, 0.1)',
                                width: 48,
                                height: 48
                            }}>
                                <FeedbackIcon sx={{ color: '#9c27b0', fontSize: 24 }} />
                            </Avatar>
                            <Typography variant="h5" sx={{ 
                                fontWeight: 600, 
                                color: '#1a1a1a' 
                            }}>
                                Detailed AI Feedback
                            </Typography>
                        </Box>
                        
                        <Paper sx={{
                            p: 3,
                            background: 'rgba(156, 39, 176, 0.02)',
                            border: '1px solid rgba(156, 39, 176, 0.1)',
                            borderRadius: 3
                        }}>
                            <Typography variant="body1" sx={{ 
                                color: '#555',
                                lineHeight: 1.8,
                                fontSize: '1.1rem'
                            }}>
                                {typeof feedback === 'object' 
                                    ? JSON.stringify(feedback) 
                                    : feedback || 'The system is still processing the detailed feedback. The feedback will be available soon with an in-depth analysis of your performance.'
                                }
                            </Typography>
                        </Paper>
                    </Paper>
                </Fade>

                {/* Charts and Detailed Results */}
                {id !== undefined && (
                    <>
                        <Fade in={true} timeout={1400}>
                            <Box sx={{ mb: 6 }}>
                                <SketchOfInterviewResults interviewId={id} />
                            </Box>
                        </Fade>
                        
                        <Fade in={true} timeout={1600}>
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