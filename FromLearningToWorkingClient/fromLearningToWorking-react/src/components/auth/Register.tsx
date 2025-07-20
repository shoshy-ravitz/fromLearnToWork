import React, { useState } from 'react';
import { registerUser } from '../../store/slices/authSlice';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    IconButton,
    InputAdornment,
    Divider,
    Alert,
    Paper,
    LinearProgress
} from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { asyncDispatch } = useAsyncDispatch();
    const navigate = useNavigate();

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        return strength;
    };

    const getPasswordStrengthLabel = (strength: number) => {
        if (strength <= 25) return 'Weak';
        if (strength <= 50) return 'Fair';
        if (strength <= 75) return 'Good';
        return 'Strong';
    };

    const getPasswordStrengthColor = (strength: number) => {
        if (strength <= 25) return '#f44336';
        if (strength <= 50) return '#ff9800';
        if (strength <= 75) return '#2196f3';
        return '#4caf50';
    };

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await asyncDispatch(
                registerUser({ name, email, password }),
                'Successfully registered!'
            );
            navigate('/home');
        } catch (error: any) {
            setError('Registration failed. Please check your details and try again.');
            console.error('Registration failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const passwordStrength = getPasswordStrength(password);

    return (
        <Box
            sx={{
                minHeight: '100vh', // גובה מינימלי של כל הדף
                background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.03) 0%, #ffffff 100%)', // רקע בהיר
                display: 'flex', // שימוש ב-flexbox
                justifyContent: 'center', // מרכז אופקית
                alignItems: 'center', // מרכז אנכית
                padding: '40px', // ריווח פנימי
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        borderRadius: 4,
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #f0f0f0',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                color: '#1a1a1a',
                                mb: 1,
                            }}
                        >
                            Create Account
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666',
                            }}
                        >
                            Fill in your details to get started
                        </Typography>
                    </Box>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 3,
                                borderRadius: 2,
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    <form onSubmit={handleRegister}>
                        <Box sx={{ mb: 3 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    color: '#1a1a1a',
                                    mb: 1
                                }}
                            >
                                Full Name
                            </Typography>
                            <TextField
                                fullWidth
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color: '#666' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

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
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
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
                                placeholder="Create a strong password"
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
                            />
                            
                            {password && (
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="caption" sx={{ color: '#666' }}>
                                            Password strength
                                        </Typography>
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                color: getPasswordStrengthColor(passwordStrength),
                                                fontWeight: 600
                                            }}
                                        >
                                            {getPasswordStrengthLabel(passwordStrength)}
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={passwordStrength}
                                        sx={{
                                            height: 6,
                                            borderRadius: 3,
                                            backgroundColor: '#f0f0f0',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: getPasswordStrengthColor(passwordStrength),
                                                borderRadius: 3
                                            }
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            endIcon={!loading && <ArrowForwardIcon />}
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                mb: 3,
                                '&:disabled': {
                                    bgcolor: '#ccc',
                                    color: '#666'
                                }
                            }}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" sx={{ color: '#666', px: 2 }}>
                                or
                            </Typography>
                        </Divider>

                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    style={{
                                        color: 'rgb(255, 204, 0)',
                                        textDecoration: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Sign in here
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;

