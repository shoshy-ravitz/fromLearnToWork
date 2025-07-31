// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import { fetchUserInterviews } from '../../../store/slices/userInterviewsSlice';
// import { StoreType } from '../../../store/store';
// import {
//     Drawer,
//     List,
//     ListItem,
//     ListItemButton,
//     ListItemText,
//     Box,
//     Typography,
//     IconButton,
// } from '@mui/material';
// import { ChevronLeft, ChevronRight } from '@mui/icons-material';
// import GeneralFeedbackForInterviews from './GeneralFeedbackForInterviews';

// const InterviewHistory = () => {
//     const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const location = useLocation(); // Get the current location
//     const listInterviews = useSelector((state: StoreType) => state.userInterviews.interviews);

//     const [isOpen, setIsOpen] = useState(true); // Sidebar starts open by default

//     useEffect(() => {
//         if (userId) {
//             dispatch(fetchUserInterviews(Number(userId))); // Fetch the list of interviews
//         }
//     }, [dispatch, userId]);

//     const handleNavigate = (interviewId: number) => {
//         setIsOpen(false); // Close the sidebar when navigating
//         navigate(`resultInterview/${interviewId}`);
//     };

//     return (
//         <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
//             {/* Sidebar */}
//             <Drawer
//                 variant="persistent"
//                 anchor="left"
//                 open={isOpen}
//                 sx={{
//                     width: isOpen ? 240 : 50,
//                     flexShrink: 0,
//                     '& .MuiDrawer-paper': {
//                         width: isOpen ? 240 : 50,
//                         boxSizing: 'border-box',
//                         overflowX: 'hidden',
//                         transition: 'width 0.3s',
//                     },
//                 }}
//             >
//                 {isOpen && (
//                     <Box sx={{ padding: 2 }}>
//                         <Typography variant="h6" gutterBottom>
//                             Interview History
//                         </Typography>
//                         <List>
//                             {listInterviews.map((interview) => (
//                                 <ListItem key={interview.id} disablePadding>
//                                     <ListItemButton onClick={() => handleNavigate(interview.id)}>
//                                         <ListItemText
//                                             primary={`Interview ID: ${interview.id}`}
//                                             secondary={`Mark: ${interview.mark}`}
//                                         />
//                                     </ListItemButton>
//                                 </ListItem>
//                             ))}
//                         </List>
//                     </Box>
//                 )}
//             </Drawer>

//             {/* Toggle Button */}
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: isOpen ? 240 : 50,
//                     transform: 'translateY(-50%)',
//                     zIndex: 1000,
//                 }}
//             >
//                 <IconButton onClick={() => setIsOpen(!isOpen)}>
//                     {isOpen ? <ChevronLeft /> : <ChevronRight />}
//                 </IconButton>
//             </Box>

//             {/* Main Content */}
//             <Box
//                 sx={{
//                     flexGrow: 1,
//                     padding: 2,
//                     overflowY: 'auto', // Enable scrolling for long content
//                     scrollbarWidth: 'none', // Hide scrollbar for Firefox
//                     '&::-webkit-scrollbar': {
//                         display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
//                     },
//                 }}
//             >
//                 {/* Show GeneralFeedbackForInterviews if no interview is selected */}
//                 {location.pathname === '/histoyInterview' ? (
//                     <GeneralFeedbackForInterviews />
//                 ) : (
//                     <Outlet />
//                 )}
//             </Box>
//         </div>
//     );
// };

// export default InterviewHistory;
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

    const [isOpen, setIsOpen] = useState(false); // Sidebar starts closed by default for better UX
    const [hoveredInterview, setHoveredInterview] = useState<number | null>(null);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserInterviews(Number(userId)));
        }
    }, [dispatch, userId]);

    const handleNavigate = (interviewId: number) => {
        navigate(`resultInterview/${interviewId}`);
    };

    const getScoreColor = (mark: number) => {
        if (mark >= 80) return '#4caf50';
        if (mark >= 60) return 'rgb(255, 204, 0)';
        if (mark >= 40) return '#ff9800';
        return '#f44336';
    };

    const getScoreLabel = (mark: number) => {
        if (mark >= 80) return 'מצוין';
        if (mark >= 60) return 'טוב';
        if (mark >= 40) return 'בינוני';
        return 'צריך שיפור';
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
            {/* Floating Toggle Button */}
            <Box
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: isOpen ? 340 : 20,
                    transform: 'translateY(-50%)',
                    zIndex: 1300,
                    transition: 'left 0.3s ease'
                }}
            >
                <Tooltip title={isOpen ? 'סגור רשימת ראיונות' : 'פתח רשימת ראיונות'} placement="right">
                    <IconButton
                        onClick={() => setIsOpen(!isOpen)}
                        sx={{
                            bgcolor: 'white',
                            color: 'rgb(255, 204, 0)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            width: 48,
                            height: 48,
                            '&:hover': {
                                bgcolor: 'rgba(255, 204, 0, 0.1)',
                                transform: 'scale(1.1)',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {isOpen ? <ChevronLeft /> : <MenuIcon />}
                    </IconButton>
                </Tooltip>
            </Box>

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
                                    היסטוריית ראיונות
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#666' }}>
                                    {listInterviews.length} ראיונות נשמרו
                                </Typography>
                            </Box>
                        </Box>
                        
                        <IconButton
                            onClick={() => setIsOpen(false)}
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
                                ממוצע
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
                                ראיונות
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
                                אין ראיונות עדיין
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                התחל את הראיון הראשון שלך!
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
                                                            ראיון #{interview.id}
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
                                                        דירוג
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
                                                        סטטוס
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ 
                                                        color: '#4caf50',
                                                        fontWeight: 600,
                                                        fontSize: '0.8rem',
                                                        mt: 0.5
                                                    }}>
                                                        הושלם
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