import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { downloadResume } from '../../store/slices/resumeSlice';
import { StoreType } from '../../store/store';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Grid,
    Stack,
    Alert,
    CircularProgress,
    Fade,
    IconButton,
    Card,
    CardContent,
    Link
} from '@mui/material';
import {
    Download as DownloadIcon,
    PictureAsPdf as PdfIcon,
    CheckCircle as CheckCircleIcon,
    Close as CloseIcon,
    FileDownload as FileDownloadIcon,
    OpenInNew as OpenInNewIcon,
    Info as InfoIcon,
    CloudDownload as CloudDownloadIcon
} from '@mui/icons-material';

const DownloadResume: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string>('');
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    
    const { asyncDispatch } = useAsyncDispatch();
    const userId = useSelector((state: StoreType) => state.auth.userId);
    const navigate = useNavigate();

    const handleDownload = async () => {
        if (!userId) {
            setError('משתמש לא מזוהה. אנא התחבר.');
            navigate('/login');
            return;
        }

        setLoading(true);
        setError(null);
        setDownloadSuccess(false);

        try {
            const presignedUrl = await asyncDispatch(
                downloadResume(Number(userId)),
                'קישור ההורדה נוצר בהצלחה!',
                'הורדת קורות החיים נכשלה. נסה שוב.'
            );
            
            if (presignedUrl) {
                setDownloadUrl(presignedUrl);
                setDownloadSuccess(true);
                
                // Automatically trigger download
                const link = document.createElement('a');
                link.href = presignedUrl;
                link.download = 'resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Error downloading resume:', error);
            setError('אירעה שגיאה במהלך הורדת קורות החיים. נסה שוב.');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenInNewTab = () => {
        if (downloadUrl) {
            window.open(downloadUrl, '_blank');
        }
    };

    const handleClose = () => {
        navigate('/home');
    };

    const features = [
        'Download your latest resume',
        'PDF format for best compatibility',
        'Secure encrypted download',
        'Access anytime, anywhere'
    ];

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
                                    <Box sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        background: 'rgba(255, 204, 0, 0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 3
                                    }}>
                                        <CloudDownloadIcon sx={{ fontSize: 40, color: 'rgb(255, 204, 0)' }} />
                                    </Box>
                                    
                                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                                        Download Resume
                                    </Typography>
                                    
                                    <Typography variant="h6" sx={{ color: '#ccc', mb: 4, fontWeight: 400 }}>
                                        Get instant access to your professionally stored resume
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

                        {/* Right Panel - Download */}
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
                                        Get Your Resume
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#666'
                                        }}
                                    >
                                        Download your latest resume as a PDF file
                                    </Typography>
                                </Box>

                                {error && (
                                    <Alert 
                                        severity="error" 
                                        sx={{ 
                                            mb: 3,
                                            borderRadius: 2
                                        }}
                                    >
                                        {error}
                                    </Alert>
                                )}

                                {downloadSuccess && (
                                    <Fade in={downloadSuccess} timeout={600}>
                                        <Card sx={{ 
                                            mb: 3,
                                            border: '1px solid #4caf50',
                                            backgroundColor: 'rgba(76, 175, 80, 0.08)'
                                        }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                    <PdfIcon sx={{ color: '#f44336', fontSize: 32 }} />
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="h6" sx={{ 
                                                            fontWeight: 600, 
                                                            color: '#1a1a1a',
                                                            mb: 0.5
                                                        }}>
                                                            resume.pdf
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                                            Your resume is ready for download
                                                        </Typography>
                                                    </Box>
                                                    <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 24 }} />
                                                </Box>
                                                
                                                <Stack direction="row" spacing={2}>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        startIcon={<DownloadIcon />}
                                                        onClick={handleDownload}
                                                        sx={{
                                                            borderColor: '#4caf50',
                                                            color: '#4caf50',
                                                            '&:hover': {
                                                                borderColor: '#45a049',
                                                                backgroundColor: 'rgba(76, 175, 80, 0.08)'
                                                            }
                                                        }}
                                                    >
                                                        Download Again
                                                    </Button>
                                                    <Button
                                                        variant="text"
                                                        size="small"
                                                        startIcon={<OpenInNewIcon />}
                                                        onClick={handleOpenInNewTab}
                                                        sx={{
                                                            color: '#2196f3',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(33, 150, 243, 0.08)'
                                                            }
                                                        }}
                                                    >
                                                        Open in New Tab
                                                    </Button>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                )}

                                {/* Download Area */}
                                <Box
                                    sx={{
                                        border: '2px dashed #e0e0e0',
                                        borderRadius: 3,
                                        p: 4,
                                        textAlign: 'center',
                                        backgroundColor: '#fafafa',
                                        mb: 3
                                    }}
                                >
                                    <FileDownloadIcon sx={{ 
                                        fontSize: 64, 
                                        color: '#666',
                                        mb: 2 
                                    }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1 }}>
                                        Ready to Download
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                                        Click the button below to download your resume as a PDF
                                    </Typography>
                                    
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleDownload}
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
                                        sx={{
                                            py: 1.5,
                                            px: 4,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            borderRadius: 2,
                                            textTransform: 'none',
                                            '&:disabled': {
                                                bgcolor: '#ccc',
                                                color: '#666'
                                            }
                                        }}
                                    >
                                        {loading ? 'Preparing Download...' : 'Download Resume'}
                                    </Button>
                                </Box>

                                {/* Info Alert */}
                                <Alert 
                                    severity="info" 
                                    icon={<InfoIcon />}
                                    sx={{ 
                                        borderRadius: 2,
                                        backgroundColor: 'rgba(33, 150, 243, 0.08)',
                                        border: '1px solid rgba(33, 150, 243, 0.2)'
                                    }}
                                >
                                    <Typography variant="body2">
                                        Your resume will be downloaded as a PDF file. Make sure your browser allows downloads from this site.
                                    </Typography>
                                </Alert>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        Downloaded files are securely served through encrypted connections
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default DownloadResume;