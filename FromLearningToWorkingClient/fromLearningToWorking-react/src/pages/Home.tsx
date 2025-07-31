import React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardContent,
    Avatar,
    Chip,
    useTheme,
    useMediaQuery,
    Stack,
    Paper
} from '@mui/material';
import {
    QuestionAnswer as InterviewIcon,
    Upload as UploadIcon,
    TrendingUp as TrendingUpIcon,
    School as SchoolIcon,
    Work as WorkIcon,
    Star as StarIcon,
    ArrowForward as ArrowForwardIcon,
    PlayArrow as PlayArrowIcon,
    CheckCircle as CheckCircleIcon,
    Timeline as TimelineIcon,
    Psychology as PsychologyIcon,
    Lightbulb as LightbulbIcon
} from '@mui/icons-material';

const Home: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const features = [
        {
            icon: <InterviewIcon sx={{ fontSize: 40 }} />,
            title: 'AI-Powered Interviews',
            description: 'Practice with intelligent mock interviews tailored to your field with detailed feedback',
            link: '/interview',
            color: '#ff6b6b'
        },
        {
            icon: <UploadIcon sx={{ fontSize: 40 }} />,
            title: 'Resume Management',
            description: 'Upload, update, and manage your resumes with our smart CV analysis system',
            link: '/upload',
            color: '#4ecdc4'
        },
        {
            icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
            title: 'Progress Tracking',
            description: 'Monitor your improvement with detailed analytics and performance insights',
            link: '/histoyInterview',
            color: '#45b7d1'
        }
    ];

    const stats = [
        { number: '10,000+', label: 'Interviews Completed', icon: <CheckCircleIcon /> },
        { number: '95%', label: 'Success Rate', icon: <StarIcon /> },
        { number: '500+', label: 'Job Categories', icon: <WorkIcon /> },
        { number: '24/7', label: 'Availability', icon: <TimelineIcon /> }
    ];

    const benefits = [
        {
            icon: <PsychologyIcon sx={{ color: 'rgb(255, 204, 0)' }} />,
            title: 'Smart AI Feedback',
            description: 'Get personalized insights and recommendations'
        },
        {
            icon: <LightbulbIcon sx={{ color: 'rgb(255, 204, 0)' }} />,
            title: 'Industry Insights',
            description: 'Learn from real interview scenarios and best practices'
        },
        {
            icon: <TimelineIcon sx={{ color: 'rgb(255, 204, 0)' }} />,
            title: 'Progress Analytics',
            description: 'Track your improvement over time with detailed metrics'
        }
    ];

    return (
        <Box sx={{ 
            minHeight: '100vh',
            minWidth: '100vw',
            background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
            paddingTop: '70px'
        }}>
            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <Chip 
                                label="🚀 New: AI-Powered Interview Coach"
                                sx={{ 
                                    mb: 3,
                                    bgcolor: 'rgba(255, 204, 0, 0.1)',
                                    color: '#1a1a1a',
                                    fontWeight: 600,
                                    fontSize: '0.85rem'
                                }}
                            />
                            
                            <Typography
                                variant="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                                    fontWeight: 800,
                                    background: 'linear-gradient(135deg, #1a1a1a 0%, #404040 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 2,
                                    lineHeight: 1.1
                                }}
                            >
                                From Learning
                                <Box component="span" sx={{ 
                                    display: 'block',
                                    background: 'linear-gradient(135deg, rgb(255, 204, 0) 0%, #f0b800 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    to Working
                                </Box>
                            </Typography>
                            
                            <Typography
                                variant="h5"
                                sx={{
                                    color: '#666',
                                    mb: 4,
                                    lineHeight: 1.6,
                                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                                    maxWidth: 500
                                }}
                            >
                                Master your next job interview with our AI-powered practice platform. 
                                Build confidence, improve skills, and land your dream job.
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                                <Button
                                    component={Link}
                                    to="/interview"
                                    variant="contained"
                                    size="large"
                                    endIcon={<PlayArrowIcon />}
                                    sx={{
                                        bgcolor: 'rgb(255, 204, 0)',
                                        color: '#1a1a1a',
                                        fontWeight: 600,
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            bgcolor: '#f0b800',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}
                                >
                                    Start Interview Now
                                </Button>
                                
                                <Button
                                    component={Link}
                                    to="/register"
                                    variant="outlined"
                                    size="large"
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        color: '#1a1a1a',
                                        borderColor: '#1a1a1a',
                                        fontWeight: 600,
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            borderColor: 'rgb(255, 204, 0)',
                                            color: 'rgb(255, 204, 0)',
                                            backgroundColor: 'rgba(255, 204, 0, 0.05)'
                                        }
                                    }}
                                >
                                    Sign Up Free
                                </Button>
                            </Stack>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarIcon key={star} sx={{ color: '#ffc107', fontSize: 20 }} />
                                    ))}
                                </Box>
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                    <strong>4.9/5</strong> from 2,000+ users
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    width: { xs: 280, md: 350 },
                                    height: { xs: 280, md: 350 },
                                    background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.1) 0%, rgba(255, 204, 0, 0.05) 100%)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                     alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    border: '2px solid rgba(255, 204, 0, 0.2)',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        width: '85%',
                                        height: '85%',
                                        background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.15) 0%, rgba(255, 204, 0, 0.05) 100%)',
                                        borderRadius: '50%',
                                        animation: 'pulse 3s ease-in-out infinite'
                                    }
                                }}>
                                    <SchoolIcon sx={{ 
                                        fontSize: { xs: 80, md: 120 }, 
                                        color: 'rgb(255, 204, 0)',
                                        zIndex: 1
                                    }} />
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Stats Section */}
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Grid container spacing={3}>
                    {stats.map((stat, index) => (
                        <Grid item xs={6} md={3} key={index}>
                            <Card sx={{ 
                                textAlign: 'center',
                                p: 3,
                                height: '100%',
                                background: 'rgba(255, 255, 255, 0.9)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 204, 0, 0.1)',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 32px rgba(255, 204, 0, 0.2)'
                                }
                            }}>
                                <Box sx={{ mb: 2, color: 'rgb(255, 204, 0)' }}>
                                    {stat.icon}
                                </Box>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        color: '#1a1a1a',
                                        mb: 1,
                                        fontSize: { xs: '1.5rem', md: '2rem' }
                                    }}
                                >
                                    {stat.number}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#666',
                                        fontWeight: 500
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Chip 
                        label="Features"
                        sx={{ 
                            mb: 2,
                            bgcolor: 'rgba(255, 204, 0, 0.1)',
                            color: 'rgb(255, 204, 0)',
                            fontWeight: 600
                        }}
                    />
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 2,
                            fontSize: { xs: '2rem', md: '2.5rem' }
                        }}
                    >
                        Why Choose Our Platform?
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#666',
                            maxWidth: 600,
                            mx: 'auto',
                            fontWeight: 400
                        }}
                    >
                        Advanced AI technology meets personalized learning to prepare you 
                        for your next career opportunity
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card
                                component={Link}
                                to={feature.link}
                                sx={{
                                    height: '100%',
                                    p: 3,
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    border: '2px solid transparent',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        borderColor: 'rgb(255, 204, 0)',
                                        '& .feature-icon': {
                                            transform: 'scale(1.1)',
                                            color: feature.color
                                        }
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 0 }}>
                                    <Box 
                                        className="feature-icon"
                                        sx={{ 
                                            mb: 3,
                                            color: 'rgb(255, 204, 0)',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            color: '#1a1a1a',
                                            mb: 2
                                        }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#666',
                                            lineHeight: 1.6,
                                            mb: 3
                                        }}
                                    >
                                        {feature.description}
                                    </Typography>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        color: 'rgb(255, 204, 0)',
                                        fontWeight: 600,
                                        fontSize: '0.9rem'
                                    }}>
                                        Learn More
                                        <ArrowForwardIcon sx={{ ml: 1, fontSize: 16 }} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Benefits Section */}
            <Box sx={{ bgcolor: '#f8f9fa', py: 8 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    mb: 3,
                                    fontSize: { xs: '2rem', md: '2.5rem' }
                                }}
                            >
                                Built for Your Success
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#666',
                                    mb: 4,
                                    fontWeight: 400,
                                    lineHeight: 1.6
                                }}
                            >
                                Our platform combines cutting-edge AI technology with proven 
                                interview techniques to give you the competitive edge you need.
                            </Typography>
                            
                            <Stack spacing={3}>
                                {benefits.map((benefit, index) => (
                                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                        <Avatar sx={{ 
                                            bgcolor: 'rgba(255, 204, 0, 0.1)',
                                            width: 48,
                                            height: 48
                                        }}>
                                            {benefit.icon}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1 }}>
                                                {benefit.title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#666' }}>
                                                {benefit.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <Box sx={{ 
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 400
                            }}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        width: 300,
                                        height: 300,
                                        borderRadius: 4,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                                        color: 'white',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 204, 0, 0.1) 50%, transparent 70%)',
                                            animation: 'shimmer 2s infinite'
                                        }
                                    }}
                                >
                                    <WorkIcon sx={{ fontSize: 100, color: 'rgb(255, 204, 0)', zIndex: 1 }} />
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                py: 8,
                color: 'white'
            }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                fontSize: { xs: '1.8rem', md: '2.5rem' }
                            }}
                        >
                            Ready to Ace Your Interview?
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#ccc',
                                mb: 4,
                                maxWidth: 500,
                                mx: 'auto',
                                fontWeight: 400
                            }}
                        >
                            Join thousands of successful candidates who've landed their dream jobs 
                            with our AI-powered interview preparation
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                            <Button
                                component={Link}
                                to="/register"
                                variant="contained"
                                size="large"
                                endIcon={<StarIcon />}
                                sx={{
                                    bgcolor: 'rgb(255, 204, 0)',
                                    color: '#1a1a1a',
                                    fontWeight: 600,
                                    px: 6,
                                    py: 2,
                                    fontSize: '1.1rem',
                                    '&:hover': {
                                        bgcolor: '#f0b800',
                                        transform: 'translateY(-2px)',
                                    }
                                }}
                            >
                                Get Started Free
                            </Button>
                            <Button
                                component={Link}
                                to="/interview"
                                variant="outlined"
                                size="large"
                                endIcon={<PlayArrowIcon />}
                                sx={{
                                    color: 'white',
                                    borderColor: 'white',
                                    fontWeight: 600,
                                    px: 6,
                                    py: 2,
                                    fontSize: '1.1rem',
                                    '&:hover': {
                                        borderColor: 'rgb(255, 204, 0)',
                                        color: 'rgb(255, 204, 0)',
                                        backgroundColor: 'rgba(255, 204, 0, 0.05)'
                                    }
                                }}
                            >
                                Try Demo
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            <style>
                {`
                    @keyframes pulse {
                        0%, 100% { 
                            transform: scale(1); 
                            opacity: 0.8; 
                        }
                        50% { 
                            transform: scale(1.05); 
                            opacity: 0.6; 
                        }
                    }
                    
                    @keyframes shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                `}
            </style>
        </Box>
    );
};

export default Home;
