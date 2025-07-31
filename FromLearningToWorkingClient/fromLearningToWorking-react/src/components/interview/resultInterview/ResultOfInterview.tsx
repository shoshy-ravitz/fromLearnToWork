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
    Alert,
    Avatar,
    LinearProgress,
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
                        מעבד את תוצאות הראיון
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        אנא המתן בזמן שהמערכת מנתחת את הביצועים שלך...
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
                            שגיאה בטעינת התוצאות
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666' }}>
                        {/* {error ? JSON.stringify(error) : 'אירעה שגיאה בטעינת הנתונים'} */}

                            {/* {error || 'משהו השתבש בעת טעינת תוצאות הראיון. אנא נסה שוב מאוחר יותר.'} */}
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
        if (score >= 80) return 'מצוין';
        if (score >= 60) return 'טוב';
        if (score >= 40) return 'בינוני';
        return 'צריך שיפור';
    };

    const formatTime = (seconds: number) => {
        if (!seconds) return 'לא זמין';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins} דקות ו-${secs} שניות`;
    };

    const getPerformanceInsights = (score: number) => {
        if (score >= 80) {
            return {
                title: 'ביצועים מעולים!',
                message: 'הראיון שלך היה מצוין. אתה מוכן לעולם העבודה!',
                icon: <CheckCircleIcon sx={{ color: '#4caf50' }} />,
                tips: [
                    'המשך להתרגל כדי לשמור על הרמה',
                    'התמקד בחיזוק הנקודות החזקות שלך',
                    'שקול להתרגל על תפקידים בכירים יותר'
                ]
            };
        } else if (score >= 60) {
            return {
                title: 'ביצועים טובים',
                message: 'יש לך בסיס חזק, עם מקום קטן לשיפור.',
                icon: <TrendingUpIcon sx={{ color: 'rgb(255, 204, 0)' }} />,
                tips: [
                    'עבוד על נקודות החולשה שזוהו',
                    'התרגל על שאלות מאתגרות יותר',
                    'חזק את הביטחון העצמי שלך'
                ]
            };
        } else {
            return {
                title: 'יש מקום לשיפור',
                message: 'עם תרגול נוסף תוכל להשיג תוצאות טובות יותר.',
                icon: <SpeedIcon sx={{ color: '#ff9800' }} />,
                tips: [
                    'התמקד בתרגול הבסיסי',
                    'למד מהמשוב שקיבלת',
                    'נסה שוב לאחר תרגול נוסף'
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
                            תוצאות הראיון שלך
                        </Typography>
                        
                        <Typography variant="h1" sx={{ 
                            fontSize: '4rem',
                            fontWeight: 800,
                            color: getScoreColor(mark || 0),
                            mb: 1,
                            textShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}>
                            {mark !== undefined && mark !== null ? `${mark}%` : 'לא זמין'}
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
                                        זמן ראיון
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
                                        ניתוח AI
                                    </Typography>
                                    <Typography variant="h4" sx={{ 
                                        fontWeight: 700, 
                                        color: '#1a1a1a',
                                        fontSize: '1.5rem'
                                    }}>
                                        מוכן
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
                                        דירוג כללי
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
                                        {Math.ceil((mark || 0) / 20)} מתוך 5 כוכבים
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
                                    המלצות לשיפור:
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
                                משוב מפורט מהבינה המלאכותית
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
                                    : feedback || 'המערכת עדיין מעבדת את המשוב המפורט. המשוב יהיה זמין בקרוב עם ניתוח מעמיק של הביצועים שלך.'
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