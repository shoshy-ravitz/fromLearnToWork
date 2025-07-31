"use client"
import React, { useState } from 'react';
import { loginUser } from '../../store/slices/authSlice';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Container,
    IconButton,
    InputAdornment,
    Divider,
    Alert
} from '@mui/material';
import {
    Login as LoginIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { asyncDispatch } = useAsyncDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await asyncDispatch(
                loginUser({ email, password }),
                'Logged in successfully!'
            );
            navigate('/home');
        } catch (error: any) {
            setError('Invalid email or password. Please try again.');
            console.error('Login failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            minWidth: '100vw',
            background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.05) 0%, #ffffff 100%)',
            display: 'flex',
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '40px' 
        }}>
            <Container maxWidth="sm">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <LoginIcon sx={{ 
                        fontSize: 60, 
                        color: 'rgb(255, 204, 0)',
                        mb: 2,
                        p: 1.5,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 204, 0, 0.1)'
                    }} />
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            color: '#1a1a1a',
                            mb: 1,
                            fontSize: { xs: '2rem', md: '2.5rem' }
                        }}
                    >
                        Welcome Back
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#666',
                            fontWeight: 400
                        }}
                    >
                        Log in to your account to continue
                    </Typography>
                </Box>

                <Card sx={{
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #f0f0f0',
                    overflow: 'visible',
                    position: 'relative'
                }}>
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        {error && (
                            <Alert 
                                severity="error" 
                                sx={{ 
                                    mb: 3,
                                    borderRadius: 2,
                                    '& .MuiAlert-icon': {
                                        color: '#d32f2f'
                                    }
                                }}
                            >
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleLogin}>
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#1a1a1a',
                                        mb: 1
                                    }}
                                >
                                    Email Address
                                </Typography>
                                <TextField
                                    fullWidth
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon sx={{ color: '#666' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: '#fafafa',
                                            border: '1px solid #e0e0e0',
                                            '&:hover': {
                                                borderColor: 'rgb(255, 204, 0)',
                                                backgroundColor: '#ffffff'
                                            },
                                            '&.Mui-focused': {
                                                borderColor: 'rgb(255, 204, 0)',
                                                backgroundColor: '#ffffff',
                                                boxShadow: '0 0 0 3px rgba(255, 204, 0, 0.1)'
                                            },
                                            '& fieldset': {
                                                border: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        color: '#1a1a1a',
                                        mb: 1
                                    }}
                                >
                                    Password
                                </Typography>
                                <TextField
                                    fullWidth
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon sx={{ color: '#666' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                    sx={{ color: '#666' }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            backgroundColor: '#fafafa',
                                            border: '1px solid #e0e0e0',
                                            '&:hover': {
                                                borderColor: 'rgb(255, 204, 0)',
                                                backgroundColor: '#ffffff'
                                            },
                                            '&.Mui-focused': {
                                                borderColor: 'rgb(255, 204, 0)',
                                                backgroundColor: '#ffffff',
                                                boxShadow: '0 0 0 3px rgba(255, 204, 0, 0.1)'
                                            },
                                            '& fieldset': {
                                                border: 'none'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                endIcon={!loading && <ArrowForwardIcon />}
                                sx={{
                                    bgcolor: 'rgb(255, 204, 0)',
                                    color: '#1a1a1a',
                                    fontWeight: 600,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    boxShadow: '0 8px 24px rgba(255, 204, 0, 0.3)',
                                    '&:hover': {
                                        bgcolor: '#f0b800',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 12px 32px rgba(255, 204, 0, 0.4)'
                                    },
                                    '&:disabled': {
                                        bgcolor: '#ccc',
                                        color: '#666',
                                        transform: 'none',
                                        boxShadow: 'none'
                                    },
                                    transition: 'all 0.3s ease',
                                    mb: 3
                                }}
                            >
                                {loading ? 'Logging in...' : 'Log In'}
                            </Button>

                            <Divider sx={{ my: 3 }}>
                                <Typography variant="body2" sx={{ color: '#666', px: 2 }}>
                                    or
                                </Typography>
                            </Divider>

                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                    Don't have an account yet?{' '}
                                    <Link
                                        to="/register"
                                        style={{
                                            color: 'rgb(255, 204, 0)',
                                            textDecoration: 'none',
                                            fontWeight: 600
                                        }}
                                    >
                                        Sign up now
                                    </Link>
                                </Typography>
                            </Box>
                        </form>
                    </CardContent>
                </Card>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        By continuing, you agree to our Terms of Service and Privacy Policy
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;