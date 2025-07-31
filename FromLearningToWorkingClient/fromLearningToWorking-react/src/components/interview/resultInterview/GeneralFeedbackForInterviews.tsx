import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInterviews } from '../../../store/slices/userInterviewsSlice';
import { StoreType } from '../../../store/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
    Box, 
    Typography, 
    CircularProgress, 
    Container,
    Paper,
    Grid,
    Card,
    CardContent,
    Avatar,
    Chip,
    Stack,
    LinearProgress,
    Fade
} from '@mui/material';
import {
    TrendingUp as TrendingUpIcon,
    Assessment as AssessmentIcon,
    EmojiEvents as TrophyIcon,
    Timeline as TimelineIcon,
    Star as StarIcon,
    Psychology as PsychologyIcon,
    CheckCircle as CheckCircleIcon,
    Speed as SpeedIcon,
    BarChart as BarChartIcon
} from '@mui/icons-material';

const InterviewFeedback: React.FC = () => {
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const { interviews, status, error } = useSelector((state: StoreType) => state.userInterviews);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserInterviews(Number(userId)));
        }
    }, [dispatch, userId]);

    const interviewsWithIndex = interviews.map((interview, index) => ({
        ...interview,
        index: index + 1,
        date: `Interview ${index + 1}`
    }));

    const averageMark = interviews.length
        ? Math.round(
              interviews.reduce((sum, interview) => sum + interview.mark, 0) / interviews.length
          )
        : 0;

    const getFeedback = () => {
        if (averageMark >= 80) return {
            message: 'Excellent! You are ready for a professional job interview',
            color: '#4caf50',
            icon: <CheckCircleIcon />
        };
        if (averageMark >= 60) return {
            message: 'Good, but there is a little room for improvement',
            color: 'rgb(255, 204, 0)',
            icon: <TrendingUpIcon />
        };
        return {
            message: 'More practice is needed to be ready for the interview',
            color: '#ff9800',
            icon: <SpeedIcon />
        };
    };

    const getProgressTrend = () => {
        if (interviews.length < 2) return null;
        const recent = interviews.slice(-3);
        const older = interviews.slice(0, -3);
        
        const recentAvg = recent.reduce((sum, i) => sum + i.mark, 0) / recent.length;
        const olderAvg = older.length > 0 ? older.reduce((sum, i) => sum + i.mark, 0) / older.length : 0;
        
        return recentAvg - olderAvg;
    };

    const trend = getProgressTrend();
    const feedback = getFeedback();

    if (status === 'loading') {
        return (
            <Box sx={{
                minHeight: '80vh',
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
                            mb: 3
                        }} 
                    />
                    <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 600 }}>
                        Loading performance data...
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (status === 'failed') {
        return (
            <Container maxWidth="md" sx={{ py: 8 }}>
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
                        <AssessmentIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
                        Error loading data
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                        {error || 'An error occurred while loading your performance data'}
                    </Typography>
                </Paper>
            </Container>
        );
    }

    if (!interviews || interviews.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Paper elevation={0} sx={{
                    p: 6,
                    textAlign: 'center',
                    borderRadius: 4,
                    border: '1px solid #f0f0f0',
                    background: '#ffffff'
                }}>
                    <Avatar sx={{ 
                        bgcolor: 'rgba(255, 204, 0, 0.1)',
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 3
                    }}>
                        <PsychologyIcon sx={{ fontSize: 40, color: 'rgb(255, 204, 0)' }} />
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1a1a1a' }}>
                        You have not conducted any interviews yet
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                        Start your journey with the first interview to see your statistics
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Header */}
            <Fade in={true} timeout={600}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Avatar sx={{
                        bgcolor: 'rgba(255, 204, 0, 0.1)',
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 3
                    }}>
                        <AssessmentIcon sx={{ fontSize: 40, color: 'rgb(255, 204, 0)' }} />
                    </Avatar>
                    
                    <Typography variant="h3" sx={{ 
                        fontWeight: 700, 
                        color: '#1a1a1a',
                        mb: 2
                    }}>
                        Overall Performance Summary
                    </Typography>
                    
                    <Typography variant="h6" sx={{ 
                        color: '#666',
                        fontWeight: 400,
                        maxWidth: 600,
                        mx: 'auto'
                    }}>
                        Detailed analysis of your interview progress
                    </Typography>
                </Box>
            </Fade>

            {/* Main Stats Cards */}
            <Fade in={true} timeout={800}>
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid item xs={12} md={40}>
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
                                    bgcolor: feedback.color + '15',
                                    width: 60,
                                    height: 60,
                                    mx: 'auto',
                                    mb: 2
                                }}>
                                    <Box sx={{ color: feedback.color, fontSize: 30 }}>
                                        {feedback.icon}
                                    </Box>
                                </Avatar>
                                
                                <Typography variant="h3" sx={{
                                    fontWeight: 800,
                                    color: feedback.color,
                                    mb: 1
                                }}>
                                    {averageMark}%
                                </Typography>
                                
                                <Typography variant="body2" sx={{ 
                                    color: '#666',
                                    fontWeight: 500,
                                    mb: 2
                                }}>
                                    Average Score
                                </Typography>

                                <LinearProgress
                                    variant="determinate"
                                    value={averageMark}
                                    sx={{
                                        height: 6,
                                        borderRadius: 3,
                                        bgcolor: '#f0f0f0',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: feedback.color,
                                            borderRadius: 3
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={40}>
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
                                    <TimelineIcon sx={{ color: '#2196f3', fontSize: 30 }} />
                                </Avatar>
                                
                                <Typography variant="h3" sx={{
                                    fontWeight: 800,
                                    color: '#1a1a1a',
                                    mb: 1
                                }}>
                                    {interviews.length}
                                </Typography>
                                
                                <Typography variant="body2" sx={{ 
                                    color: '#666',
                                    fontWeight: 500,
                                    mb: 2
                                }}>
                                    Total Interviews
                                </Typography>

                                {trend !== null && (
                                    <Chip
                                        icon={trend >= 0 ? <TrendingUpIcon /> : <SpeedIcon />}
                                        label={`${trend >= 0 ? '+' : ''}${trend.toFixed(1)}% Trend`}
                                        sx={{
                                            bgcolor: trend >= 0 ? '#4caf50' : '#ff9800',
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: '0.75rem'
                                        }}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={40}>
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
                                    bgcolor: 'rgba(255, 193, 7, 0.1)',
                                    width: 60,
                                    height: 60,
                                    mx: 'auto',
                                    mb: 2
                                }}>
                                    <TrophyIcon sx={{ color: '#ffc107', fontSize: 30 }} />
                                </Avatar>
                                
                                <Typography variant="h3" sx={{
                                    fontWeight: 800,
                                    color: '#1a1a1a',
                                    mb: 1
                                }}>
                                    {Math.max(...interviews.map(i => i.mark))}%
                                </Typography>
                                
                                <Typography variant="body2" sx={{ 
                                    color: '#666',
                                    fontWeight: 500,
                                    mb: 2
                                }}>
                                    Personal Best
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarIcon 
                                            key={star} 
                                            sx={{ 
                                                color: star <= Math.ceil(Math.max(...interviews.map(i => i.mark)) / 20) ? '#ffc107' : '#e0e0e0',
                                                fontSize: 20
                                            }} 
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Fade>

            {/* Feedback Message */}
            <Fade in={true} timeout={1000}>
                <Paper elevation={0} sx={{
                    p: 4,
                    mb: 6,
                    borderRadius: 4,
                    border: `2px solid ${feedback.color}`,
                    background: `${feedback.color}05`
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar sx={{
                            bgcolor: feedback.color,
                            width: 60,
                            height: 60
                        }}>
                            {feedback.icon}
                        </Avatar>
                        
                        <Box>
                            <Typography variant="h5" sx={{ 
                                fontWeight: 600,
                                color: '#1a1a1a',
                                mb: 1
                            }}>
                                {feedback.message}
                            </Typography>
                            
                            <Typography variant="body1" sx={{ color: '#666' }}>
                                Based on {interviews.length} interviews you conducted
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Fade>

            {/* Progress Chart */}
            <Fade in={true} timeout={1200}>
                <Paper elevation={0} sx={{
                    p: 4,
                    borderRadius: 4,
                    border: '1px solid #f0f0f0',
                    background: '#ffffff'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                        <Avatar sx={{
                            bgcolor: 'rgba(255, 204, 0, 0.1)',
                            width: 48,
                            height: 48
                        }}>
                            <BarChartIcon sx={{ color: 'rgb(255, 204, 0)', fontSize: 24 }} />
                        </Avatar>
                        
                        <Box>
                            <Typography variant="h5" sx={{ 
                                fontWeight: 600, 
                                color: '#1a1a1a',
                                mb: 0.5
                            }}>
                                Score Progress Chart
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                Tracking your improvement over time
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Box sx={{ height: 400, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={interviewsWithIndex}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="rgb(255, 204, 0)" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="rgb(255, 204, 0)" stopOpacity={0.05}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis 
                                    dataKey="date" 
                                    tick={{ fill: '#666', fontSize: 12 }}
                                    axisLine={{ stroke: '#e0e0e0' }}
                                />
                                <YAxis 
                                    domain={[0, 100]}
                                    tick={{ fill: '#666', fontSize: 12 }}
                                    axisLine={{ stroke: '#e0e0e0' }}
                                />
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                    formatter={(value) => [`${value}%`, 'Score']}
                                    labelStyle={{ color: '#1a1a1a', fontWeight: 600 }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="mark" 
                                    stroke="rgb(255, 204, 0)" 
                                    strokeWidth={3}
                                    fill="url(#colorScore)"
                                    dot={{ 
                                        fill: 'rgb(255, 204, 0)', 
                                        strokeWidth: 2, 
                                        r: 6,
                                        stroke: '#ffffff'
                                    }}
                                    activeDot={{ 
                                        r: 8, 
                                        fill: 'rgb(255, 204, 0)',
                                        stroke: '#ffffff',
                                        strokeWidth: 3
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Box>

                    {/* Chart Insights */}
                    <Box sx={{ mt: 4, p: 3, background: '#f8f9fa', borderRadius: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                        First Score
                                    </Typography>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 700, 
                                        color: '#1a1a1a' 
                                    }}>
                                        {interviews[0]?.mark}%
                                    </Typography>
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                        Last Score
                                    </Typography>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 700, 
                                        color: '#1a1a1a' 
                                    }}>
                                        {interviews[interviews.length - 1]?.mark}%
                                    </Typography>
                                </Box>
                            </Grid>
                            
                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2" sx={{ color: '#666', mb: 1 }}>
                                        Overall Improvement
                                    </Typography>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 700, 
                                        color: trend && trend >= 0 ? '#4caf50' : '#ff9800'
                                    }}>
                                        {interviews.length > 1 ? 
                                            `${interviews[interviews.length - 1]?.mark - interviews[0]?.mark >= 0 ? '+' : ''}${interviews[interviews.length - 1]?.mark - interviews[0]?.mark}%`
                                            : 'N/A'
                                        }
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Fade>

            {/* Performance Tips */}
            <Fade in={true} timeout={1400}>
                <Paper elevation={0} sx={{
                    p: 4,
                    mt: 6,
                    borderRadius: 4,
                    border: '1px solid #f0f0f0',
                    background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.02) 0%, #ffffff 100%)'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Avatar sx={{
                            bgcolor: 'rgba(156, 39, 176, 0.1)',
                            width: 48,
                            height: 48
                        }}>
                            <PsychologyIcon sx={{ color: '#9c27b0', fontSize: 24 }} />
                        </Avatar>
                        
                        <Typography variant="h5" sx={{ 
                            fontWeight: 600, 
                            color: '#1a1a1a' 
                        }}>
                            Personal Improvement Recommendations
                        </Typography>
                    </Box>

                    <Grid container spacing={3}>
                        {averageMark >= 80 ? (
                            <>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ 
                                        p: 3, 
                                        background: '#ffffff',
                                        borderRadius: 3,
                                        border: '1px solid #e0e0e0'
                                    }}>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 600, 
                                            color: '#4caf50',
                                            mb: 2
                                        }}>
                                            💪 Keep up the high level
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Your performance is excellent! Focus on strengthening your strengths and continue practicing for more advanced roles.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ 
                                        p: 3, 
                                        background: '#ffffff',
                                        borderRadius: 3,
                                        border: '1px solid #e0e0e0'
                                    }}>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 600, 
                                            color: '#2196f3',
                                            mb: 2
                                        }}>
                                            🎯 Further Specialization
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Try more advanced interviews or focus on specific areas that interest you.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </>
                        ) : averageMark >= 60 ? (
                            <>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ 
                                        p: 3, 
                                        background: '#ffffff',
                                        borderRadius: 3,
                                        border: '1px solid #e0e0e0'
                                    }}>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 600, 
                                            color: 'rgb(255, 204, 0)',
                                            mb: 2
                                        }}>
                                            📈 Strengthen Weak Points
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Identify the areas that need improvement and practice them specifically.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ 
                                        p: 3, 
                                        background: '#ffffff',
                                        borderRadius: 3,
                                        border: '1px solid #e0e0e0'
                                    }}>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 600, 
                                            color: '#9c27b0',
                                            mb: 2
                                        }}>
                                            🧠 Learn from Feedback
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Carefully read the feedback you received and apply the recommendations in your next interviews.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ 
                                        p: 3, 
                                        background: '#ffffff',
                                        borderRadius: 3,
                                        border: '1px solid #e0e0e0'
                                    }}>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 600, 
                                            color: '#ff9800',
                                            mb: 2
                                        }}>
                                            📚 Basic Practice
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Focus on practicing basic questions and building your confidence.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ 
                                        p: 3, 
                                        background: '#ffffff',
                                        borderRadius: 3,
                                        border: '1px solid #e0e0e0'
                                    }}>
                                        <Typography variant="h6" sx={{ 
                                            fontWeight: 600, 
                                            color: '#f44336',
                                            mb: 2
                                        }}>
                                            ⏰ Additional Practice
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            Dedicate more time to daily practice and try again after more thorough preparation.
                                        </Typography>
                                    </Box>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Paper>
            </Fade>
        </Container>
    );
};

export default InterviewFeedback;