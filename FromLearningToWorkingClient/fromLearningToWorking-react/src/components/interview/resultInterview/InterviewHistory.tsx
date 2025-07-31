import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { fetchUserInterviews } from '../../../store/slices/userInterviewsSlice';
import { StoreType } from '../../../store/store';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    Typography,
    IconButton,
    Paper,
    Avatar,
    Chip,
    Stack,
    Fade,
    Tooltip,
    Divider,
    Card,
    CardContent,
    LinearProgress
} from '@mui/material';
import {
    ChevronLeft,
    ChevronRight,
    History as HistoryIcon,
    Assessment as AssessmentIcon,
    Schedule as TimeIcon,
    Star as StarIcon,
    TrendingUp as TrendingUpIcon,
    EmojiEvents as TrophyIcon,
    CalendarToday as CalendarIcon,
    Close as CloseIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import GeneralFeedbackForInterviews from './GeneralFeedbackForInterviews';

const InterviewHistory = () => {
    const userId = localStorage.getItem('userId');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const listInterviews = useSelector((state: StoreType) => state.userInterviews.interviews);

    const [isOpen, setIsOpen] = useState(true); // Sidebar starts closed by default for better UX
    const [hoveredInterview, setHoveredInterview] = useState<number | null>(null);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserInterviews(Number(userId)));
        }
    }, [dispatch, userId]);

    const handleNavigate = (interviewId: number) => {
        navigate(`resultInterview/${interviewId}`);
    };

    const closeSidebar = () => {
        navigate('/home')
    }

    const getScoreColor = (mark: number) => {
        if (mark >= 80) return '#4caf50';
        if (mark >= 60) return 'rgb(255, 204, 0)';
        if (mark >= 40) return '#ff9800';
        return '#f44336';
    };

    const getScoreLabel = (mark: number) => {
        if (mark >= 80) return 'exellent';
        if (mark >= 60) return 'good';
        if (mark >= 40) return 'Medium';
        return 'Needs improvement';
    };

    const getPerformanceIcon = (mark: number) => {
        if (mark >= 80) return <TrophyIcon sx={{ color: '#4caf50' }} />;
        if (mark >= 60) return <TrendingUpIcon sx={{ color: 'rgb(255, 204, 0)' }} />;
        return <AssessmentIcon sx={{ color: '#ff9800' }} />;
    };

    // Calculate average score
    const averageScore = listInterviews.length > 0
        ? Math.round(listInterviews.reduce((sum, interview) => sum + interview.mark, 0) / listInterviews.length)
        : 0;

    // Sort interviews by ID (newest first)
    const sortedInterviews = [...listInterviews].sort((a, b) => b.id - a.id);

    return (
        <Box sx={{ display: 'flex', height: '100vh', position: 'relative', bgcolor: '#f8f9fa' }}>
            {/* Enhanced Sidebar */}
            <Drawer
                variant="persistent"
                anchor="left"
                open={isOpen}
                sx={{
                    width: isOpen ? 360 : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 360,
                        boxSizing: 'border-box',
                        overflowX: 'hidden',
                        transition: 'width 0.3s ease',
                        background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)',
                        borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.08)'
                    },
                }}
            >
                {/* Sidebar Header */}
                <Paper elevation={0} sx={{
                    p: 3,
                    background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.05) 0%, #ffffff 100%)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{
                                bgcolor: 'rgba(255, 204, 0, 0.1)',
                                width: 48,
                                height: 48
                            }}>
                                <HistoryIcon sx={{ color: 'rgb(255, 204, 0)', fontSize: 24 }} />
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 700, 
                                    color: '#1a1a1a',
                                    fontSize: '1.1rem'
                                }}>
                                   Interview history
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#666' }}>
                                    {listInterviews.length} Interviews saved
                                </Typography>
                            </Box>
                        </Box>
                        
                        <IconButton
                            onClick={() => closeSidebar()}
                            sx={{
                                color: '#95a5a6',
                                '&:hover': {
                                    color: 'rgb(255, 204, 0)',
                                    bgcolor: 'rgba(255, 204, 0, 0.1)'
                                }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Quick Stats */}
                    <Stack direction="row" spacing={2}>
                        <Card sx={{ 
                            flex: 1, 
                            p: 1.5, 
                            textAlign: 'center',
                            background: 'rgba(76, 175, 80, 0.05)',
                            border: '1px solid rgba(76, 175, 80, 0.1)'
                        }}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 700, 
                                color: '#4caf50',
                                fontSize: '1.2rem'
                            }}>
                                {averageScore}%
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666' }}>
                                avarage
                            </Typography>
                        </Card>
                        
                        <Card sx={{ 
                            flex: 1, 
                            p: 1.5, 
                            textAlign: 'center',
                            background: 'rgba(33, 150, 243, 0.05)',
                            border: '1px solid rgba(33, 150, 243, 0.1)'
                        }}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 700, 
                                color: '#2196f3',
                                fontSize: '1.2rem'
                            }}>
                                {listInterviews.length}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666' }}>
                                interviews
                            </Typography>
                        </Card>
                    </Stack>
                </Paper>

                {/* Interviews List */}
                <Box sx={{ 
                    flex: 1, 
                    p: 2,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: 6,
                    },
                    '&::-webkit-scrollbar-track': {
                        background: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: 3,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(255, 204, 0, 0.3)',
                        borderRadius: 3,
                        '&:hover': {
                            background: 'rgba(255, 204, 0, 0.5)',
                        }
                    }
                }}>
                    {sortedInterviews.length === 0 ? (
                        <Paper sx={{
                            p: 4,
                            textAlign: 'center',
                            borderRadius: 3,
                            border: '1px solid #f0f0f0'
                        }}>
                            <Avatar sx={{
                                bgcolor: 'rgba(255, 204, 0, 0.1)',
                                width: 60,
                                height: 60,
                                mx: 'auto',
                                mb: 2
                            }}>
                                <HistoryIcon sx={{ color: 'rgb(255, 204, 0)', fontSize: 30 }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
                            No interviews yet
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                            Start your first interview!
                            </Typography>
                        </Paper>
                    ) : (
                        <List sx={{ p: 0 }}>
                            {sortedInterviews.map((interview, index) => (
                                <Fade key={interview.id} in={true} timeout={300 + index * 100}>
                                    <Card
                                        sx={{
                                            mb: 2,
                                            cursor: 'pointer',
                                            background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                                            border: '1px solid #e0e0e0',
                                            borderRadius: 3,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                                borderColor: 'rgba(255, 204, 0, 0.3)'
                                            }
                                        }}
                                        onMouseEnter={() => setHoveredInterview(interview.id)}
                                        onMouseLeave={() => setHoveredInterview(null)}
                                        onClick={() => handleNavigate(interview.id)}
                                    >
                                        <CardContent sx={{ p: 3 }}>
                                            {/* Interview Header */}
                                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{
                                                        bgcolor: getScoreColor(interview.mark) + '15',
                                                        width: 40,
                                                        height: 40
                                                    }}>
                                                        {getPerformanceIcon(interview.mark)}
                                                    </Avatar>
                                                    
                                                    <Box>
                                                        <Typography variant="h6" sx={{ 
                                                            fontWeight: 600,
                                                            color: '#1a1a1a',
                                                            fontSize: '1rem',
                                                            mb: 0.5
                                                        }}>
                                                            interview #{interview.id}
                                                        </Typography>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <CalendarIcon sx={{ fontSize: 14, color: '#666' }} />
                                                            <Typography variant="caption" sx={{ color: '#666' }}>
                                                                {new Date().toLocaleDateString('he-IL')}
                                                            </Typography>
                                                        </Stack>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ textAlign: 'right' }}>
                                                    <Typography variant="h5" sx={{
                                                        fontWeight: 800,
                                                        color: getScoreColor(interview.mark),
                                                        fontSize: '1.5rem',
                                                        lineHeight: 1
                                                    }}>
                                                        {interview.mark}%
                                                    </Typography>
                                                    <Chip
                                                        label={getScoreLabel(interview.mark)}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: getScoreColor(interview.mark),
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: '0.7rem',
                                                            mt: 0.5
                                                        }}
                                                    />
                                                </Box>
                                            </Box>

                                            {/* Progress Bar */}
                                            <Box sx={{ mb: 2 }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={interview.mark}
                                                    sx={{
                                                        height: 6,
                                                        borderRadius: 3,
                                                        bgcolor: '#f0f0f0',
                                                        '& .MuiLinearProgress-bar': {
                                                            bgcolor: getScoreColor(interview.mark),
                                                            borderRadius: 3
                                                        }
                                                    }}
                                                />
                                            </Box>

                                            {/* Performance Insights */}
                                            <Stack direction="row" spacing={2}>
                                                <Box sx={{ 
                                                    flex: 1,
                                                    p: 1.5,
                                                    background: 'rgba(33, 150, 243, 0.05)',
                                                    borderRadius: 2,
                                                    textAlign: 'center'
                                                }}>
                                                    <Typography variant="caption" sx={{ 
                                                        color: '#2196f3',
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase',
                                                        fontSize: '0.7rem'
                                                    }}>
                                                        rating
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.2, mt: 0.5 }}>
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <StarIcon 
                                                                key={star} 
                                                                sx={{ 
                                                                    color: star <= Math.ceil(interview.mark / 20) ? '#ffc107' : '#e0e0e0',
                                                                    fontSize: 12
                                                                }} 
                                                            />
                                                        ))}
                                                    </Box>
                                                </Box>

                                                <Box sx={{ 
                                                    flex: 1,
                                                    p: 1.5,
                                                    background: 'rgba(76, 175, 80, 0.05)',
                                                    borderRadius: 2,
                                                    textAlign: 'center'
                                                }}>
                                                    <Typography variant="caption" sx={{ 
                                                        color: '#4caf50',
                                                        fontWeight: 600,
                                                        textTransform: 'uppercase',
                                                        fontSize: '0.7rem'
                                                    }}>
                                                        status
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ 
                                                        color: '#4caf50',
                                                        fontWeight: 600,
                                                        fontSize: '0.8rem',
                                                        mt: 0.5
                                                    }}>
                                                        completed
                                                    </Typography>
                                                </Box>
                                            </Stack>

                                            {/* Hover Effect Indicator */}
                                            {hoveredInterview === interview.id && (
                                                <Box sx={{
                                                    position: 'absolute',
                                                    right: 8,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    width: 3,
                                                    height: 30,
                                                    bgcolor: 'rgb(255, 204, 0)',
                                                    borderRadius: 2
                                                }} />
                                            )}
                                        </CardContent>
                                    </Card>
                                </Fade>
                            ))}
                        </List>
                    )}
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    marginLeft: isOpen ? 0 : '-360px',
                    transition: 'margin-left 0.3s ease',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    bgcolor: '#f8f9fa',
                    minHeight: '100vh'
                }}
            >
                {/* Main Content Container */}
                <Box sx={{ 
                    p: 4,
                    maxWidth: '100%',
                    minHeight: '100vh'
                }}>
                    {location.pathname === '/histoyInterview' ? (
                        <Fade in={true} timeout={600}>
                            <Box>
                                <GeneralFeedbackForInterviews />
                            </Box>
                        </Fade>
                    ) : (
                        <Fade in={true} timeout={600}>
                            <Box>
                                <Outlet />
                            </Box>
                        </Fade>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default InterviewHistory;