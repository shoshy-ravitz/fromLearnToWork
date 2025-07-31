import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Question from './Question';
import { StoreType } from '../../../store/store';
import { nextQuestion } from '../../../store/slices/interviewSlice';
import CreateInterview from './createInterview';
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
    LinearProgress,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    Fade,
    IconButton
} from '@mui/material';
import {
    School as SchoolIcon,
    Work as WorkIcon,
    TrendingUp as ExpertIcon,
    QuestionAnswer as QuestionIcon,
    CheckCircle as CheckIcon,
    Info as InfoIcon,
    Timer as TimerIcon,
    Psychology as PsychologyIcon,
    EmojiEvents as TrophyIcon,
    Close as CloseIcon,
    Lightbulb as TipIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const Interview: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showInfoDialog, setShowInfoDialog] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<string>('');
    
    const questions = useSelector((state: StoreType) => state.interview.questions);
    const currentQuestionIndex = useSelector((state: StoreType) => state.interview.currentQuestionIndex);
    const interviewId = useSelector((state: StoreType) => state.interview.IdInterview);

    const handleNextQuestion = () => {
        dispatch(nextQuestion());
    };

    const handleFinishInterview = () => {
        navigate(`/resultInterview/${interviewId}`);
    };

    const difficultyLevels = [
        {
            id: 'entry',
            title: 'Entry Level',
            subtitle: 'Perfect for beginners',
            icon: <SchoolIcon sx={{ fontSize: 32 }} />,
            color: '#4caf50',
            description: 'Basic questions focusing on fundamentals, motivation, and learning ability',
            duration: '15-20 minutes',
            questionCount: '5-7 questions',
            features: [
                'Basic behavioral questions',
                'Simple technical concepts',
                'Educational background focus',
                'Growth mindset evaluation'
            ]
        },
        {
            id: 'mid',
            title: 'Mid Level',
            subtitle: 'For experienced professionals',
            icon: <WorkIcon sx={{ fontSize: 32 }} />,
            color: 'rgb(255, 204, 0)',
            description: 'Intermediate questions about experience, problem-solving, and leadership',
            duration: '25-30 minutes',
            questionCount: '7-10 questions',
            features: [
                'Experience-based scenarios',
                'Problem-solving challenges',
                'Team collaboration questions',
                'Project management skills'
            ]
        },
        {
            id: 'senior',
            title: 'Senior Level',
            subtitle: 'For industry experts',
            icon: <ExpertIcon sx={{ fontSize: 32 }} />,
            color: '#f44336',
            description: 'Advanced questions about strategy, leadership, and complex decision-making',
            duration: '35-45 minutes',
            questionCount: '10-12 questions',
            features: [
                'Strategic thinking questions',
                'Complex problem solving',
                'Leadership scenarios',
                'Industry expertise evaluation'
            ]
        }
    ];

    const interviewSteps = [
        'Choose your experience level that matches your background',
        'Answer each question thoughtfully with specific examples',
        'Receive detailed AI-powered feedback and suggestions',
        'Track your progress and improvement over time'
    ];

    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

    if (questions.length === 0) {
        return (
            <Box sx={{ 
                minHeight: '100vh',
                minWidth: '100vw',
                background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.05) 0%, #ffffff 100%)',
                paddingTop: '100px',
                paddingBottom: '40px'
            }}>
                <Container maxWidth="lg">
                    {/* Hero Section */}
                    <Fade in={true} timeout={800}>
                        <Box sx={{ textAlign: 'center', mb: 8 }}>
                            <Box sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: 'rgba(255, 204, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3
                            }}>
                                <PsychologyIcon sx={{ fontSize: 40, color: 'rgb(255, 204, 0)' }} />
                            </Box>
                            
                            <Typography variant="h2" sx={{ 
                                fontWeight: 700, 
                                color: '#1a1a1a',
                                mb: 2,
                                fontSize: { xs: '2rem', md: '2.5rem' }
                            }}>
                                AI Interview Practice
                            </Typography>
                            
                            <Typography variant="h6" sx={{ 
                                color: '#666',
                                mb: 4,
                                maxWidth: 600,
                                mx: 'auto',
                                fontWeight: 400
                            }}>
                                Practice with our intelligent AI interviewer and get instant feedback 
                                to improve your interview skills
                            </Typography>

                            <Stack direction="row" spacing={2} justifyContent="center">
                                <Button
                                    onClick={() => setShowInfoDialog(true)}
                                    variant="outlined"
                                    startIcon={<InfoIcon />}
                                    sx={{
                                        color: '#1a1a1a',
                                        borderColor: '#1a1a1a',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        '&:hover': {
                                            borderColor: 'rgb(255, 204, 0)',
                                            color: 'rgb(255, 204, 0)',
                                            backgroundColor: 'rgba(255, 204, 0, 0.05)'
                                        }
                                    }}
                                >
                                    How It Works
                                </Button>
                            </Stack>
                        </Box>
                    </Fade>

                    {/* Difficulty Selection */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" sx={{ 
                            textAlign: 'center', 
                            mb: 2, 
                            color: '#1a1a1a',
                            fontWeight: 600
                        }}>
                            Choose Your Interview Level
                        </Typography>
                        <Typography variant="body1" sx={{ 
                            textAlign: 'center', 
                            mb: 4, 
                            color: '#666',
                            maxWidth: 500,
                            mx: 'auto'
                        }}>
                            Select the difficulty level that matches your experience and career stage
                        </Typography>

                        <Grid container spacing={3}>
                            {difficultyLevels.map((level, index) => (
                                <Grid item xs={12} md={4} key={level.id}>
                                    <Fade in={true} timeout={600 + index * 200}>
                                        <Card 
                                            sx={{
                                                height: '100%',
                                                borderRadius: 4,
                                                border: selectedLevel === level.id 
                                                    ? `2px solid ${level.color}` 
                                                    : '2px solid #f0f0f0',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                                    border: `2px solid ${level.color}`
                                                }
                                            }}
                                            onClick={() => setSelectedLevel(level.id)}
                                        >
                                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                                <Box sx={{
                                                    width: 64,
                                                    height: 64,
                                                    borderRadius: '50%',
                                                    background: `${level.color}15`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    mx: 'auto',
                                                    mb: 3
                                                }}>
                                                    <Box sx={{ color: level.color }}>
                                                        {level.icon}
                                                    </Box>
                                                </Box>
                                                
                                                <Typography variant="h6" sx={{ 
                                                    fontWeight: 600, 
                                                    mb: 1,
                                                    color: '#1a1a1a'
                                                }}>
                                                    {level.title}
                                                </Typography>
                                                
                                                <Typography variant="body2" sx={{ 
                                                    color: '#666', 
                                                    mb: 3,
                                                    fontWeight: 500
                                                }}>
                                                    {level.subtitle}
                                                </Typography>
                                                
                                                <Typography variant="body2" sx={{ 
                                                    mb: 3,
                                                    lineHeight: 1.6,
                                                    color: '#555'
                                                }}>
                                                    {level.description}
                                                </Typography>

                                                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
                                                    <Chip 
                                                        icon={<TimerIcon sx={{ fontSize: 16 }} />}
                                                        label={level.duration}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ fontSize: '0.75rem' }}
                                                    />
                                                    <Chip 
                                                        icon={<QuestionIcon sx={{ fontSize: 16 }} />}
                                                        label={level.questionCount}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ fontSize: '0.75rem' }}
                                                    />
                                                </Stack>

                                                <List dense sx={{ textAlign: 'left' }}>
                                                    {level.features.map((feature, i) => (
                                                        <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                                                            <ListItemIcon sx={{ minWidth: 24 }}>
                                                                <CheckIcon sx={{ color: level.color, fontSize: 16 }} />
                                                            </ListItemIcon>
                                                            <ListItemText 
                                                                primary={feature}
                                                                sx={{
                                                                    '& .MuiListItemText-primary': {
                                                                        fontSize: '0.875rem',
                                                                        color: '#666'
                                                                    }
                                                                }}
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>

                                                {selectedLevel === level.id && (
                                                    <Chip 
                                                        label="Selected"
                                                        sx={{ 
                                                            mt: 2,
                                                            bgcolor: level.color,
                                                            color: 'white',
                                                            fontWeight: 600
                                                        }}
                                                    />
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>

                    {/* Start Interview Button */}
                    <Fade in={selectedLevel !== ''} timeout={600}>
                        <Box sx={{ textAlign: 'center' }}>
                            <CreateInterview selectedLevel={selectedLevel} />
                        </Box>
                    </Fade>
                </Container>

                {/* How It Works Dialog */}
                <Dialog 
                    open={showInfoDialog} 
                    onClose={() => setShowInfoDialog(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: { 
                            borderRadius: 4,
                            border: '1px solid #f0f0f0'
                        }
                    }}
                >
                    <DialogTitle sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        pb: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                background: 'rgba(255, 204, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TipIcon sx={{ color: 'rgb(255, 204, 0)', fontSize: 20 }} />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                                How It Works
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={() => setShowInfoDialog(false)}
                            sx={{ color: '#666' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    
                    <DialogContent sx={{ p: 4 }}>
                        <Typography variant="body1" sx={{ 
                            color: '#666', 
                            mb: 4,
                            lineHeight: 1.6
                        }}>
                            Our AI interview simulator helps you practice and improve your interview skills 
                            through a simple 4-step process:
                        </Typography>

                        <Stack spacing={3}>
                            {interviewSteps.map((step, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    <Box sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        background: 'rgba(255, 204, 0, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                        mt: 0.5
                                    }}>
                                        <Typography variant="body2" sx={{ 
                                            fontWeight: 600, 
                                            color: 'rgb(255, 204, 0)' 
                                        }}>
                                            {index + 1}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ 
                                        color: '#555',
                                        lineHeight: 1.6
                                    }}>
                                        {step}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>

                        <Paper sx={{ 
                            p: 3, 
                            mt: 4, 
                            bgcolor: 'rgba(255, 204, 0, 0.05)',
                            borderRadius: 3,
                            border: '1px solid rgba(255, 204, 0, 0.1)'
                        }}>
                            <Typography variant="h6" sx={{ 
                                fontWeight: 600, 
                                mb: 2,
                                color: '#1a1a1a'
                            }}>
                                What Makes Our AI Special?
                            </Typography>
                            <List>
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemIcon>
                                        <PsychologyIcon sx={{ color: 'rgb(255, 204, 0)' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Intelligent Analysis"
                                        secondary="AI evaluates your answers for content, structure, and clarity"
                                        sx={{
                                            '& .MuiListItemText-primary': { fontWeight: 500 },
                                            '& .MuiListItemText-secondary': { color: '#666' }
                                        }}
                                    />
                                </ListItem>
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemIcon>
                                        <TrophyIcon sx={{ color: 'rgb(255, 204, 0)' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Personalized Feedback"
                                        secondary="Get specific suggestions to improve your performance"
                                        sx={{
                                            '& .MuiListItemText-primary': { fontWeight: 500 },
                                            '& .MuiListItemText-secondary': { color: '#666' }
                                        }}
                                    />
                                </ListItem>
                                <ListItem sx={{ px: 0 }}>
                                    <ListItemIcon>
                                        <TimerIcon sx={{ color: 'rgb(255, 204, 0)' }} />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary="Real-time Tracking"
                                        secondary="Monitor your response time and answer quality"
                                        sx={{
                                            '& .MuiListItemText-primary': { fontWeight: 500 },
                                            '& .MuiListItemText-secondary': { color: '#666' }
                                        }}
                                    />
                                </ListItem>
                            </List>
                        </Paper>
                    </DialogContent>
                </Dialog>
            </Box>
        );
    }

    // Main Interview Interface (when questions are loaded)
    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.05) 0%, #ffffff 100%)'
        }}>
            {/* Progress Header */}
            <Paper elevation={0} sx={{ 
                background: '#1a1a1a',
                color: 'white',
                p: 3,
                borderRadius: 0
            }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Interview in Progress
                        </Typography>
                        
                        <Chip 
                            label={`Question ${currentQuestionIndex + 1} of ${questions.length}`}
                            sx={{ 
                                bgcolor: 'rgb(255, 204, 0)',
                                color: '#1a1a1a',
                                fontWeight: 600 
                            }}
                        />
                    </Box>
                    
                    <LinearProgress 
                        variant="determinate" 
                        value={progress}
                        sx={{ 
                            height: 6, 
                            borderRadius: 3,
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            '& .MuiLinearProgress-bar': {
                                bgcolor: 'rgb(255, 204, 0)',
                                borderRadius: 3
                            }
                        }}
                    />
                    
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                        {Math.round(progress)}% Complete
                    </Typography>
                </Container>
            </Paper>

            {/* Question Component */}
            {!isLastQuestion ? (
                <Question
                    key={questions[currentQuestionIndex].id}
                    question={questions[currentQuestionIndex].question}
                    index={currentQuestionIndex + 1}
                    onNext={handleNextQuestion}
                />
            ) : (
                <Container maxWidth="md" sx={{ py: 8 }}>
                    <Fade in={true} timeout={800}>
                        <Paper elevation={0} sx={{ 
                            textAlign: 'center', 
                            p: 6,
                            borderRadius: 4,
                            border: '1px solid #f0f0f0',
                            background: '#ffffff'
                        }}>
                            <Box sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: 'rgba(76, 175, 80, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 3
                            }}>
                                <TrophyIcon sx={{ fontSize: 40, color: '#4caf50' }} />
                            </Box>
                            
                            <Typography variant="h4" sx={{ 
                                fontWeight: 700, 
                                mb: 2,
                                color: '#1a1a1a'
                            }}>
                                Interview Completed!
                            </Typography>
                            
                            <Typography variant="h6" sx={{ 
                                mb: 4, 
                                color: '#666',
                                fontWeight: 400
                            }}>
                                Great job! You've answered all questions. 
                                Click below to see your detailed results and feedback.
                            </Typography>
                            
                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleFinishInterview}
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    bgcolor: 'rgb(255, 204, 0)',
                                    color: '#1a1a1a',
                                    fontWeight: 600,
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none',
                                    borderRadius: 3,
                                    boxShadow: '0 4px 12px rgba(255, 204, 0, 0.3)',
                                    '&:hover': {
                                        bgcolor: '#f0b800',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 16px rgba(255, 204, 0, 0.4)'
                                    },
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                View Results & Feedback
                            </Button>
                        </Paper>
                    </Fade>
                </Container>
            )}
        </Box>
    );
};

export default Interview;
