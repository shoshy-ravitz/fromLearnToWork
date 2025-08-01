import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUser } from '../../store/slices/userSlice';
import { StoreType } from '../../store/store';
import {
    Box,
    TextField,
    Button,
    Typography,
    Container,
    IconButton,
    InputAdornment,
    Alert,
    Avatar,
    Stack,
    Paper,
    Grid,
    CircularProgress
} from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    Save as SaveIcon,
    Edit as EditIcon,
    CheckCircle as CheckCircleIcon,
    Close as CloseIcon,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

const UpdateProfile: React.FC = () => {
    const { user, loading, error } = useSelector((state: StoreType) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loginMessage, setLoginMessage] = useState<string | null>(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if (!user) {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setLoginMessage('You must log in to access this page. Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
                return;
            } else {
                dispatch(fetchUserById(Number(userId)));
            }
        } else {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                password: user.password || '',
            });
        }
    }, [user, dispatch, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setUpdateSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user?.id) {
            setUpdateLoading(true);
            try {
                await dispatch(updateUser({ id: user.id, user: formData }));
                setUpdateSuccess(true);
                setTimeout(() => setUpdateSuccess(false), 3000);
            } catch (error) {
                console.error('Update failed:', error);
            } finally {
                setUpdateLoading(false);
            }
        }
    };

    const handleClose = () => {
        navigate('/home');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const features = [
        'Update your personal information',
        'Change your email address',
        'Modify your password securely',
        'All changes are encrypted'
    ];

    if (loginMessage) {
        return (
            <Box sx={{
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.03) 0%, #ffffff 100%)',
            }}>
                <Alert severity="warning" sx={{ maxWidth: 400 }}>
                    {loginMessage}
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            minWidth: '100vw',
            background: 'linear-gradient(135deg, rgba(255, 204, 0, 0.03) 0%, #ffffff 100%)',
            display: 'flex',
            alignItems: 'center',
            paddingTop: '70px',
            paddingBottom: '40px'
        }}>
            <Container maxWidth="md">
                <Box sx={{ position: 'relative' }}>
                    {/* Close Button */}
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: -40,
                            right: 0,
                            zIndex: 10,
                            bgcolor: 'white',
                            boxShadow: 2,
                            '&:hover': {
                                bgcolor: '#f5f5f5',
                                transform: 'scale(1.1)'
                            },
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Grid container spacing={0} sx={{ minHeight: '600px' }}>
                        {/* Left Panel - Branding */}
                        <Grid item xs={12} md={6}>
                            <Paper
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                                    color: 'white',
                                    p: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    borderRadius: { xs: '16px 16px 0 0', md: '16px 0 0 16px' },
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Background Pattern */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 204, 0, 0.1) 0%, transparent 50%)',
                                        zIndex: 0
                                    }}
                                />
                                
                                <Box sx={{ position: 'relative', zIndex: 1 }}>
                                    <Avatar sx={{ 
                                        bgcolor: 'rgb(255, 204, 0)', 
                                        color: '#1a1a1a',
                                        width: 60,
                                        height: 60,
                                        mb: 3
                                    }}>
                                        <EditIcon sx={{ fontSize: 30 }} />
                                    </Avatar>
                                    
                                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                                        Update Profile
                                    </Typography>
                                    
                                    <Typography variant="h6" sx={{ color: '#ccc', mb: 4, fontWeight: 400 }}>
                                        Keep your profile information current and secure
                                    </Typography>
                                    
                                    <Stack spacing={2}>
                                        {features.map((feature, index) => (
                                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <CheckCircleIcon sx={{ color: 'rgb(255, 204, 0)', fontSize: 20 }} />
                                                <Typography variant="body2" sx={{ color: '#ccc' }}>
                                                    {feature}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Stack>
                                </Box>
                            </Paper>
                        </Grid>

                        {/* Right Panel - Update Form */}
                        <Grid item xs={12} md={6}>
                            <Paper
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    p: 4,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    borderRadius: { xs: '0 0 16px 16px', md: '0 16px 16px 0' },
                                    border: '1px solid #f0f0f0'
                                }}
                            >
                                <Box sx={{ textAlign: 'center', mb: 4 }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            mb: 1
                                        }}
                                    >
                                        Profile Settings
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#666'
                                        }}
                                    >
                                        Update your personal information below
                                    </Typography>
                                </Box>

                                {loading && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                        <CircularProgress size={40} sx={{ color: 'rgb(255, 204, 0)' }} />
                                    </Box>
                                )}

                                {error && (
                                    <Alert 
                                        severity="error" 
                                        sx={{ 
                                            mb: 3,
                                            borderRadius: 2
                                        }}
                                    >
                                        {typeof error === 'string' ? error : 'An error occurred'}
                                    </Alert>
                                )}

                                {updateSuccess && (
                                    <Alert 
                                        severity="success" 
                                        sx={{ 
                                            mb: 3,
                                            borderRadius: 2
                                        }}
                                    >
                                        Profile updated successfully!
                                    </Alert>
                                )}

                                <form onSubmit={handleSubmit}>
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
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            disabled={loading}
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
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email address"
                                            disabled={loading}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon sx={{ color: '#666' }} />
                                                    </InputAdornment>
                                                ),
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
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter new password if you want to change it"
                                            disabled={loading}
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
                                    </Box>

                                    <Stack spacing={2}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            disabled={loading || updateLoading}
                                            startIcon={updateLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                            sx={{
                                                py: 1.5,
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                '&:disabled': {
                                                    bgcolor: '#ccc',
                                                    color: '#666'
                                                }
                                            }}
                                        >
                                            {updateLoading ? 'Updating...' : 'Save Changes'}
                                        </Button>
                                    </Stack>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        Your information is encrypted and stored securely
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default UpdateProfile;