import React from 'react';
import { 
    Paper, 
    Typography, 
    Box, 
    Chip,
    Stack,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import {
    QuestionAnswer as QuestionIcon,
    Person as AnswerIcon,
    Psychology as FeedbackIcon,
    Star as StarIcon
} from '@mui/icons-material';
import { Question } from '../../../models/question.model';

interface QuestionResultProps {
    question: Question;
    index?: number;
}

const QuestionResult: React.FC<QuestionResultProps> = ({ question, index }) => {
    const getScoreColor = (mark: number) => {
        if (mark >= 80) return '#4caf50';
        if (mark >= 60) return 'rgb(255, 204, 0)';
        if (mark >= 40) return '#ff9800';
        return '#f44336';
    };

    const getScoreLabel = (mark: number) => {
        if (mark >= 80) return 'Excellent';
        if (mark >= 60) return 'Good';
        if (mark >= 40) return 'Fair';
        return 'Needs Work';
    };

    return (
        <Paper elevation={0} sx={{
            mb: 4,
            borderRadius: 4,
            border: '1px solid #f0f0f0',
            background: '#ffffff',
            overflow: 'hidden'
        }}>
            {/* Header with Question Number and Score */}
            <Box sx={{
                p: 3,
                background: 'rgba(255, 204, 0, 0.05)',
                borderBottom: '1px solid #f0f0f0'
            }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: 'rgba(255, 204, 0, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Typography variant="body2" sx={{ 
                                fontWeight: 700, 
                                color: 'rgb(255, 204, 0)' 
                            }}>
                                {index || 'Q'}
                            </Typography>
                        </Box>
                        
                        <Typography variant="h6" sx={{ 
                            fontWeight: 600,
                            color: '#1a1a1a'
                        }}>
                            Question {index}
                        </Typography>
                    </Box>
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                            icon={<StarIcon sx={{ fontSize: 16 }} />}
                            label={`${question.mark}/100`}
                            sx={{
                                bgcolor: getScoreColor(question.mark),
                                color: 'white',
                                fontWeight: 600
                            }}
                        />
                        <Chip
                            label={getScoreLabel(question.mark)}
                            variant="outlined"
                            sx={{
                                borderColor: getScoreColor(question.mark),
                                color: getScoreColor(question.mark),
                                fontWeight: 500
                            }}
                        />
                    </Stack>
                </Stack>
            </Box>

            {/* Content */}
            <Box sx={{ p: 4 }}>
                {/* Question */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                        <Box sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'rgba(33, 150, 243, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            mt: 0.5
                        }}>
                            <QuestionIcon sx={{ color: '#2196f3', fontSize: 18 }} />
                        </Box>
                        
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ 
                                color: '#2196f3', 
                                fontWeight: 600, 
                                mb: 1,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                                fontSize: '0.75rem'
                            }}>
                                Question
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: '#1a1a1a',
                                lineHeight: 1.6,
                                fontSize: '1rem'
                            }}>
                                {question.question}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Answer */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                        <Box sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'rgba(76, 175, 80, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            mt: 0.5
                        }}>
                            <AnswerIcon sx={{ color: '#4caf50', fontSize: 18 }} />
                        </Box>
                        
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ 
                                color: '#4caf50', 
                                fontWeight: 600, 
                                mb: 1,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                                fontSize: '0.75rem'
                            }}>
                                Your Answer
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: '#555',
                                lineHeight: 1.6,
                                fontSize: '1rem',
                                fontStyle: question.answer ? 'normal' : 'italic'
                            }}>
                                {question.answer || 'No answer provided'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Feedback */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                        <Box sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'rgba(156, 39, 176, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            mt: 0.5
                        }}>
                            <FeedbackIcon sx={{ color: '#9c27b0', fontSize: 18 }} />
                        </Box>
                        
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ 
                                color: '#9c27b0', 
                                fontWeight: 600, 
                                mb: 1,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                                fontSize: '0.75rem'
                            }}>
                                AI Feedback
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: '#555',
                                lineHeight: 1.7,
                                fontSize: '1rem',
                                fontStyle: question.feedback ? 'normal' : 'italic'
                            }}>
                                {question.feedback || 'Feedback is being processed and will be available shortly.'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default QuestionResult;