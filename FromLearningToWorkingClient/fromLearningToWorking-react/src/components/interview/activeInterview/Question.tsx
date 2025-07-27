// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { checkAnswer, saveAnswer } from '../../../store/slices/interviewSlice';
// import { StoreType } from '../../../store/store';

// const Question = ({ index, question, onNext }) => {
//     const [answer, setAnswer] = useState(' ');
//     const [loading, setLoading] = useState(false);
//     const [elapsedTime, setElapsedTime] = useState(0);
//     const dispatch = useDispatch();
//     const codeInterview=useSelector(((state: StoreType) => state.interview.IdInterview));

//     useEffect(() => {
       
//         setElapsedTime(0);
//         const timer = setInterval(() => {
//             setElapsedTime((prevTime) => prevTime + 1);
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [question]);

//     const handleAnswerChange = (e) => {     
//         setAnswer(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             dispatch(saveAnswer({ answer }));

//             const feedbackAnswer = await dispatch(
//                 checkAnswer({
//                     question,
//                     answer,
//                     time: elapsedTime, 
//                     interviewId: codeInterview, 
//                 })
//             ).unwrap();

//             setAnswer(' ');
//             onNext();
//         } catch (error) {
//             console.error('Error checking answer:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h3>Question {index}</h3>
//             <h2>{question}</h2>
//             {!loading && <p>Time Elapsed: {elapsedTime} seconds</p> }
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={answer}
//                     onChange={handleAnswerChange}
//                     placeholder="הקלד את התשובה שלך"
//                 />
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'שולח...' : 'שלח תשובה'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Question;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAnswer, saveAnswer } from '../../../store/slices/interviewSlice';
import { StoreType } from '../../../store/store';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    LinearProgress,
    Chip,
    Container,
    IconButton,
    Collapse,
    Alert,
    Stack,
    Fade,
    CircularProgress,
    InputAdornment
} from '@mui/material';
import {
    QuestionAnswer as QuestionIcon,
    Timer as TimerIcon,
    Send as SendIcon,
    Lightbulb as TipIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Pause as PauseIcon,
    PlayArrow as PlayIcon,
    Psychology as PsychologyIcon
} from '@mui/icons-material';

interface QuestionProps {
    index: number;
    question: string;
    onNext: () => void;
}

const Question: React.FC<QuestionProps> = ({ index, question, onNext }) => {
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTimerPaused, setIsTimerPaused] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [answerLength, setAnswerLength] = useState(0);
    
    const dispatch = useDispatch();
    const codeInterview = useSelector((state: StoreType) => state.interview.IdInterview);

    useEffect(() => {
        setElapsedTime(0);
        const timer = setInterval(() => {
            if (!isTimerPaused) {
                setElapsedTime((prevTime) => prevTime + 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [question, isTimerPaused]);

    useEffect(() => {
        setAnswerLength(answer.length);
    }, [answer]);

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!answer.trim()) return;
        
        setLoading(true);

        try {
            dispatch(saveAnswer({ answer }));

            await dispatch(
                checkAnswer({
                    question,
                    answer,
                    time: elapsedTime,
                    interviewId: codeInterview,
                })
            ).unwrap();

            setAnswer('');
            onNext();
        } catch (error) {
            console.error('Error checking answer:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTimer = () => {
        setIsTimerPaused(!isTimerPaused);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getProgressColor = () => {
        if (elapsedTime < 90) return 'rgb(255, 204, 0)';
        if (elapsedTime < 180) return '#ff9800';
        return '#f44336';
    };

    const getAnswerQuality = () => {
        if (answerLength < 50) return { text: 'Too Short', color: '#f44336' };
        if (answerLength < 150) return { text: 'Good Length', color: '#ff9800' };
        if (answerLength < 300) return { text: 'Great Length', color: 'rgb(255, 204, 0)' };
        return { text: 'Very Detailed', color: '#4caf50' };
    };

    const interviewTips = [
        "Be specific and use concrete examples from your experience",
        "Structure your answer clearly with beginning, middle, and end",
        "Show your problem-solving process and thinking",
        "Demonstrate enthusiasm and genuine interest",
        "Quantify your achievements with numbers when possible"
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.05) 0%, #ffffff 100%)',
            paddingTop: '100px',
            paddingBottom: '40px'
        }}>
            <Container maxWidth="md">
                {/* Timer and Progress */}
                <Fade in={true} timeout={600}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            mb: 4,
                            borderRadius: 4,
                            border: '1px solid #f0f0f0',
                            background: '#ffffff'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    background: 'rgba(255, 204, 0, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <PsychologyIcon sx={{ color: 'rgb(255, 204, 0)', fontSize: 24 }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                                        Question {index}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        Take your time and think through your answer
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Chip 
                                    icon={<TimerIcon sx={{ fontSize: 16 }} />}
                                    label={formatTime(elapsedTime)}
                                    sx={{ 
                                        bgcolor: 'rgba(255, 204, 0, 0.1)',
                                        color: '#1a1a1a',
                                        fontWeight: 600,
                                        border: '1px solid rgba(255, 204, 0, 0.2)'
                                    }}
                                />
                                <IconButton 
                                    onClick={toggleTimer}
                                    sx={{ 
                                        color: '#666',
                                        bgcolor: '#f5f5f5',
                                        '&:hover': { bgcolor: '#e0e0e0' }
                                    }}
                                >
                                    {isTimerPaused ? <PlayIcon /> : <PauseIcon />}
                                </IconButton>
                            </Box>
                        </Box>
                        
                        <LinearProgress 
                            variant="determinate" 
                            value={Math.min((elapsedTime / 240) * 100, 100)}
                            sx={{ 
                                height: 6, 
                                borderRadius: 3,
                                bgcolor: '#f0f0f0',
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: getProgressColor(),
                                    borderRadius: 3
                                }
                            }}
                        />
                    </Paper>
                </Fade>

                {/* Question Card */}
                <Fade in={true} timeout={800}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            mb: 4,
                            borderRadius: 4,
                            border: '1px solid #f0f0f0',
                            background: '#ffffff'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'rgba(255, 204, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                mt: 0.5
                            }}>
                                <QuestionIcon sx={{ color: 'rgb(255, 204, 0)', fontSize: 20 }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ 
                                    color: 'rgb(255, 204, 0)', 
                                    fontWeight: 600, 
                                    mb: 1,
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5
                                }}>
                                    Interview Question
                                </Typography>
                                <Typography 
                                    variant="h5" 
                                    sx={{ 
                                        fontWeight: 600,
                                        color: '#1a1a1a',
                                        lineHeight: 1.4
                                    }}
                                >
                                    {question}
                                </Typography>
                            </Box>
                        </Box>
                        
                        {/* Tips Section */}
                        <Box sx={{ mt: 3 }}>
                            <Button
                                onClick={() => setShowTips(!showTips)}
                                startIcon={<TipIcon />}
                                endIcon={showTips ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                variant="text"
                                sx={{
                                    color: '#666',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 204, 0, 0.08)'
                                    }
                                }}
                            >
                                Interview Tips
                            </Button>
                            
                            <Collapse in={showTips}>
                                <Alert 
                                    severity="info" 
                                    sx={{ 
                                        mt: 2, 
                                        borderRadius: 3,
                                        bgcolor: 'rgba(255, 204, 0, 0.08)',
                                        border: '1px solid rgba(255, 204, 0, 0.2)',
                                        '& .MuiAlert-icon': {
                                            color: 'rgb(255, 204, 0)'
                                        }
                                    }}
                                >
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: '#1a1a1a' }}>
                                        Tips for a great answer:
                                    </Typography>
                                    {interviewTips.map((tip, i) => (
                                        <Typography key={i} variant="body2" sx={{ mb: 0.5, color: '#555' }}>
                                            • {tip}
                                        </Typography>
                                    ))}
                                </Alert>
                            </Collapse>
                        </Box>
                    </Paper>
                </Fade>

                {/* Answer Section */}
                <Fade in={true} timeout={1000}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            border: '1px solid #f0f0f0',
                            background: '#ffffff'
                        }}
                    >
                        <Typography variant="body2" sx={{ 
                            color: 'rgb(255, 204, 0)', 
                            fontWeight: 600, 
                            mb: 3,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5
                        }}>
                            Your Answer
                        </Typography>
                        
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                multiline
                                rows={6}
                                value={answer}
                                onChange={handleAnswerChange}
                                placeholder="Type your answer here... Be specific and provide examples."
                                disabled={loading}
                                sx={{
                                    mb: 3,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3,
                                        backgroundColor: '#fafafa',
                                        fontSize: '1rem',
                                        lineHeight: 1.6,
                                        border: '1px solid #e0e0e0',
                                        '&:hover': {
                                            backgroundColor: '#ffffff',
                                            borderColor: 'rgb(255, 204, 0)'
                                        },
                                        '&.Mui-focused': {
                                            backgroundColor: '#ffffff',
                                            borderColor: 'rgb(255, 204, 0)',
                                            boxShadow: '0 0 0 3px rgba(255, 204, 0, 0.1)'
                                        },
                                        '& fieldset': {
                                            border: 'none'
                                        }
                                    }
                                }}
                            />

                            {/* Answer Stats */}
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center',
                                mb: 3,
                                p: 2,
                                bgcolor: '#fafafa',
                                borderRadius: 2,
                                border: '1px solid #e0e0e0'
                            }}>
                                <Stack direction="row" spacing={2}>
                                    <Chip 
                                        label={`${answerLength} characters`}
                                        size="small"
                                        sx={{ 
                                            bgcolor: '#ffffff',
                                            border: '1px solid #e0e0e0'
                                        }}
                                    />
                                    <Chip 
                                        label={getAnswerQuality().text}
                                        size="small"
                                        sx={{ 
                                            bgcolor: getAnswerQuality().color,
                                            color: 'white',
                                            fontWeight: 500
                                        }}
                                    />
                                </Stack>
                            </Box>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading || !answer.trim()}
                                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                sx={{
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    bgcolor: 'rgb(255, 204, 0)',
                                    color: '#1a1a1a',
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
                                {loading ? 'Analyzing your answer...' : 'Submit Answer'}
                            </Button>
                        </form>
                    </Paper>
                </Fade>

                {/* Encouraging Message */}
                <Fade in={!loading} timeout={1200}>
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ 
                            color: '#666',
                            fontStyle: 'italic'
                        }}>
                            Take your time, think clearly, and showcase your best self
                        </Typography>
                    </Box>
                </Fade>
            </Container>
        </Box>
    );
};

export default Question;
