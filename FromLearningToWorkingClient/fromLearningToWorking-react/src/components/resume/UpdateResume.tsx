import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResumeByUserId, updateResumeWithPresignedUrl } from '../../store/slices/resumeSlice';
import { StoreType } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';
import API from '../../services/axios.interceptor';
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
    Divider,
    Chip
} from '@mui/material';
import {
    CloudUpload as UploadIcon,
    PictureAsPdf as PdfIcon,
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon,
    Update as UpdateIcon,
    Close as CloseIcon,
    Info as InfoIcon,
    History as HistoryIcon,
    SwapHoriz as SwapIcon
} from '@mui/icons-material';

const UpdateResume: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { asyncDispatch } = useAsyncDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const { resume, loading: resumeLoading, error: resumeError } = useSelector((state: StoreType) => state.resume);
    const userId = useSelector((state: StoreType) => state.auth.userId);
    
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if (userId) {
            dispatch(fetchResumeByUserId(userId));
        }
    }, [dispatch, userId]);

    const handleFileChange = (selectedFile: File | null) => {
        setError(null);
        setUpdateSuccess(false);
        
        if (!selectedFile) {
            setFile(null);
            return;
        }

        // Check if file is PDF
        if (selectedFile.type !== 'application/pdf') {
            setError('רק קבצי PDF מותרים להעלאה');
            return;
        }

        // Check file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (selectedFile.size > maxSize) {
            setError('גודל הקובץ לא יכול לעלות על 10MB');
            return;
        }

        setFile(selectedFile);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
        setFile(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!file) {
            setError('אנא בחר קובץ PDF להעלאה');
            return;
        }

        if (!userId) {
            setError('משתמש לא מזוהה. אנא התחבר.');
            navigate('/login');
            return;
        }

        setLoading(true);

        try {
            await dispatch(updateResumeWithPresignedUrl({ userId: Number(userId), file }));
            
            // Update the resume metadata on the server
            await API.put(`/resume/update/${userId}`, file.name, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setUpdateSuccess(true);
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            
            // Refresh the resume data
            dispatch(fetchResumeByUserId(userId));
            
            await asyncDispatch(
                null,
                'קורות החיים עודכנו בהצלחה!',
                ''
            );
        } catch (error) {
            console.error('Error updating resume:', error);
            setError('עדכון קורות החיים נכשל. נסה שוב.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate('/home');
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const features = [
        'Replace your current resume',
        'Maintain version history',
        'Instant update processing',
        'Secure file handling'
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

                    <Grid container spacing={0} sx={{ minHeight: '700px' }}>
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
                                        <UpdateIcon sx={{ fontSize: 40, color: 'rgb(255, 204, 0)' }} />
                                    </Box>
                                    
                                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                                        Update Resume
                                    </Typography>
                                    
                                    <Typography variant="h6" sx={{ color: '#ccc', mb: 4, fontWeight: 400 }}>
                                        Keep your professional profile current with the latest version of your resume
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
                                        Update Your Resume
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#666'
                                        }}
                                    >
                                        Replace your current resume with a new version
                                    </Typography>
                                </Box>

                                {resumeLoading && (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                                        <CircularProgress size={40} sx={{ color: 'rgb(255, 204, 0)' }} />
                                    </Box>
                                )}

                                {(error || resumeError) && (
                                    <Alert 
                                        severity="error" 
                                        sx={{ 
                                            mb: 3,
                                            borderRadius: 2
                                        }}
                                    >
                                        {error || (typeof resumeError === 'string' ? resumeError : 'שגיאה בטעינת קורות החיים')}
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
                                        קורות החיים עודכנו בהצלחה!
                                    </Alert>
                                )}

                                {/* Current Resume */}
                                {resume && resume.fileName && (
                                    <Fade in={true} timeout={600}>
                                        <Card sx={{ 
                                            mb: 3,
                                            border: '1px solid #2196f3',
                                            backgroundColor: 'rgba(33, 150, 243, 0.08)'
                                        }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                    <HistoryIcon sx={{ color: '#2196f3', fontSize: 24 }} />
                                                    <Typography variant="h6" sx={{ 
                                                        fontWeight: 600, 
                                                        color: '#1a1a1a',
                                                        flex: 1
                                                    }}>
                                                        Current Resume
                                                    </Typography>
                                                    <Chip 
                                                        label="Active" 
                                                        size="small"
                                                        sx={{ 
                                                            bgcolor: '#4caf50',
                                                            color: 'white',
                                                            fontWeight: 600
                                                        }}
                                                    />
                                                </Box>
                                                
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                                    <PdfIcon sx={{ color: '#f44336', fontSize: 32 }} />
                                                    <Box sx={{ flex: 1 }}>
                                                        <Typography variant="body1" sx={{ 
                                                            fontWeight: 600, 
                                                            color: '#1a1a1a',
                                                            wordBreak: 'break-word'
                                                        }}>
                                                            {resume.fileName}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                                            Uploaded: {formatDate(resume.UploadDate)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                
                                                <Divider sx={{ mb: 2 }} />
                                                
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <SwapIcon sx={{ color: '#ff9800', fontSize: 20 }} />
                                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                                        Upload a new file to replace this resume
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                )}

                                <form onSubmit={handleSubmit}>
                                    {/* File Upload Area */}
                                    <Box
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        onClick={!file ? handleFileSelect : undefined}
                                        sx={{
                                            border: `2px dashed ${dragActive ? 'rgb(255, 204, 0)' : file ? '#4caf50' : '#e0e0e0'}`,
                                            borderRadius: 3,
                                            p: 4,
                                            textAlign: 'center',
                                            cursor: !file ? 'pointer' : 'default',
                                            backgroundColor: dragActive ? 'rgba(255, 204, 0, 0.08)' : file ? 'rgba(76, 175, 80, 0.08)' : '#fafafa',
                                            transition: 'all 0.3s ease',
                                            mb: 3,
                                            '&:hover': !file ? {
                                                borderColor: 'rgb(255, 204, 0)',
                                                backgroundColor: 'rgba(255, 204, 0, 0.05)'
                                            } : {}
                                        }}
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                                            style={{ display: 'none' }}
                                        />
                                        
                                        {!file ? (
                                            <>
                                                <UploadIcon sx={{ 
                                                    fontSize: 48, 
                                                    color: dragActive ? 'rgb(255, 204, 0)' : '#666',
                                                    mb: 2 
                                                }} />
                                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1 }}>
                                                    {dragActive ? 'Drop your new PDF here' : 'Choose new PDF file or drag & drop'}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#666' }}>
                                                    Maximum file size: 10MB
                                                </Typography>
                                            </>
                                        ) : (
                                            <Card sx={{ 
                                                maxWidth: 300, 
                                                mx: 'auto',
                                                border: '1px solid #4caf50',
                                                backgroundColor: 'rgba(76, 175, 80, 0.05)'
                                            }}>
                                                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <PdfIcon sx={{ color: '#f44336', fontSize: 32 }} />
                                                        <Box sx={{ flex: 1, textAlign: 'left' }}>
                                                            <Typography variant="body2" sx={{ 
                                                                fontWeight: 600, 
                                                                color: '#1a1a1a',
                                                                wordBreak: 'break-word'
                                                            }}>
                                                                {file.name}
                                                            </Typography>
                                                            <Typography variant="caption" sx={{ color: '#666' }}>
                                                                {formatFileSize(file.size)}
                                                            </Typography>
                                                        </Box>
                                                        <IconButton
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleRemoveFile();
                                                            }}
                                                            size="small"
                                                            sx={{ color: '#f44336' }}
                                                        >
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </Box>

                                    {/* Info Alert */}
                                    <Alert 
                                        severity="warning" 
                                        icon={<InfoIcon />}
                                        sx={{ 
                                            mb: 3,
                                            borderRadius: 2,
                                            backgroundColor: 'rgba(255, 152, 0, 0.08)',
                                            border: '1px solid rgba(255, 152, 0, 0.2)'
                                        }}
                                    >
                                        <Typography variant="body2">
                                            <strong>Warning:</strong> Updating will replace your current resume. Make sure your new file contains all the information you need.
                                        </Typography>
                                    </Alert>

                                    {/* Update Button */}
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        disabled={!file || loading}
                                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <UpdateIcon />}
                                        sx={{
                                            py: 1.5,
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
                                        {loading ? 'Updating Resume...' : 'Update Resume'}
                                    </Button>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        Your updated resume will be processed and stored securely
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default UpdateResume;