// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../../store/slices/authSlice';
// import { Button, Modal, Box, Typography } from '@mui/material';

// const Logout = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [open, setOpen] = useState(false);

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);

//     const handleLogout = () => {
//         dispatch(logout());
//         navigate('/home');
//     };

//     return (
//         <div style={{ textAlign: 'center', marginTop: '50px' }}>
//             <h2>Logout</h2>
//             <Button variant="contained" color="primary" onClick={handleOpen}>
//                 Logout
//             </Button>

//             {/* Modal for confirmation */}
//             <Modal open={open} onClose={handleClose}>
//                 <Box
//                     sx={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         width: 400,
//                         bgcolor: 'background.paper',
//                         boxShadow: 24,
//                         p: 4,
//                         borderRadius: 2,
//                     }}
//                 >
//                     <Typography variant="h6" component="h2" gutterBottom>
//                         Are you sure you want to log out?
//                     </Typography>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
//                         <Button variant="contained" color="error" onClick={handleLogout}>
//                             Yes, Logout
//                         </Button>
//                         <Button variant="outlined" color="primary" onClick={handleClose}>
//                             Cancel
//                         </Button>
//                     </Box>
//                 </Box>
//             </Modal>
//         </div>
//     );
// };

// export default Logout;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import {
    Box,
    Button,
    Typography,
    Container,
    Avatar,
    Stack,
    Paper,
    Grid,
    IconButton
} from '@mui/material';
import {
    Logout as LogoutIcon,
    ExitToApp as ExitIcon,
    Security as SecurityIcon,
    CheckCircle as CheckCircleIcon,
    Close as CloseIcon
} from '@mui/icons-material';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            dispatch(logout());
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate('/home');
    };

    const features = [
        'Session data will be cleared',
        'You\'ll need to sign in again',
        'Your progress is safely saved',
        'Resume data remains secure'
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
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

                    <Grid container spacing={0} sx={{ minHeight: '500px' }}>
          

                        {/* Right Panel - Logout Confirmation */}
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
                                    <Avatar sx={{ 
                                        bgcolor: 'rgba(255, 204, 0, 0.1)', 
                                        color: 'rgb(255, 204, 0)',
                                        width: 80,
                                        height: 80,
                                        mb: 3,
                                        mx: 'auto'
                                    }}>
                                        <LogoutIcon sx={{ fontSize: 40 }} />
                                    </Avatar>
                                    
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            mb: 2
                                        }}
                                    >
                                        Sign Out
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#666',
                                            mb: 4,
                                            lineHeight: 1.6
                                        }}
                                    >
                                        Are you sure you want to sign out of your account? 
                                        You'll need to sign in again to access your dashboard.
                                    </Typography>
                                </Box>

                                <Stack spacing={2}>
                                    <Button
                                        onClick={handleLogout}
                                        variant="contained"
                                        size="large"
                                        disabled={loading}
                                        startIcon={<ExitIcon />}
                                        sx={{
                                            py: 1.5,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            bgcolor: '#d32f2f',
                                            '&:hover': {
                                                bgcolor: '#c62828',
                                                transform: 'translateY(-2px)',
                                            },
                                            '&:disabled': {
                                                bgcolor: '#ccc',
                                                color: '#666'
                                            }
                                        }}
                                    >
                                        {loading ? 'Signing Out...' : 'Yes, Sign Out'}
                                    </Button>
                                    
                                    <Button
                                        onClick={handleClose}
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            py: 1.5,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            color: '#1a1a1a',
                                            borderColor: '#1a1a1a',
                                            '&:hover': {
                                                borderColor: 'rgb(255, 204, 0)',
                                                color: 'rgb(255, 204, 0)',
                                                backgroundColor: 'rgba(255, 204, 0, 0.05)'
                                            }
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>

                                <Box sx={{ textAlign: 'center', mt: 4 }}>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        Your data will remain safe and can be accessed 
                                        when you sign in again
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Logout;
